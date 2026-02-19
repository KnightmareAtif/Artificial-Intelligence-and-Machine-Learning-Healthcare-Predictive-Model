import streamlit as st
import tensorflow as tf
import numpy as np
import cv2
import os
from PIL import Image

# 1. Page Configuration
st.set_page_config(page_title="Lung Disease AI Diagnostics", layout="wide")

# Mapping based on your ResNet50 notebook: 0: Covid, 1: Normal, 2: Viral, 3: Bacterial
CLASS_NAMES = ['Covid-19', 'Normal', 'Viral Pneumonia', 'Bacterial Pneumonia']

@st.cache_resource
def load_my_model():
    # Absolute pathing prevents FileNotFoundError in Streamlit Cloud
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, 'lung_disease_model.h5')
    return tf.keras.models.load_model(model_path)

def get_gradcam(img_array, model, last_conv_layer_name):
    # Setup model to output both the last conv layer and the final prediction
    grad_model = tf.keras.models.Model(
        [model.inputs], [model.get_layer(last_conv_layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:
        last_conv_layer_output, preds = grad_model(img_array)
        
        # Handle cases where model.output might return a list
        if isinstance(preds, list):
            preds = preds[0]
            
        # Get index of the top predicted class
        pred_index = tf.argmax(preds[0])
        # Extract the specific channel for the predicted class
        class_channel = preds[:, pred_index]

    # Calculate gradients of the predicted class w.r.t the feature map
    grads = tape.gradient(class_channel, last_conv_layer_output)

    # Pool the gradients across all channels
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    # Weighted sum of feature map channels based on importance
    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    # Normalize heatmap for visualization (0 to 1)
    heatmap = tf.maximum(heatmap, 0) / (tf.reduce_max(heatmap) + 1e-10)
    return heatmap.numpy()

# --- Streamlit UI ---
st.title("🫁 Lung Disease Detection & AI Interpretability")
st.write("This application uses a ResNet50 model to detect lung diseases and Grad-CAM to show which areas the AI is focusing on.")

uploaded_file = st.file_uploader("Upload Chest X-ray", type=["jpg", "jpeg", "png"])

if uploaded_file:
    # 1. Preprocessing
    img = Image.open(uploaded_file).convert('RGB')
    # Resize to 256x256 and rescale 1/255 as per Lungs.ipynb
    img_res = img.resize((256, 256))
    img_array = np.expand_dims(tf.keras.preprocessing.image.img_to_array(img_res), axis=0) / 255.0

    try:
        # 2. Prediction
        model = load_my_model()
        preds = model.predict(img_array)
        
        # Ensure preds is a numpy array for indexing
        if isinstance(preds, list):
            preds = preds[0]
            
        main_preds = preds[0]
        pred_idx = np.argmax(main_preds)
        label = CLASS_NAMES[pred_idx]
        confidence = main_preds[pred_idx] * 100

        # 3. Visualization Layout
        col1, col2 = st.columns(2)

        with col1:
            st.subheader("Diagnostic Prediction")
            if label == 'Normal':
                st.success(f"**Result:** {label}")
            else:
                st.error(f"**Result:** {label}")
            st.metric("Confidence Score", f"{confidence:.2f}%")
            st.image(img, caption="Original Uploaded X-ray", use_container_width=True)

        with col2:
            st.subheader("Model Thinking (Heatmap)")
            # 'conv5_block3_out' is the standard last layer name for ResNet50
            heatmap = get_gradcam(img_array, model, 'conv5_block3_out')
            
            # Prepare image for OpenCV overlay
            img_cv = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            heatmap_resized = cv2.resize(heatmap, (img_cv.shape[1], img_cv.shape[0]))
            heatmap_uint8 = np.uint8(255 * heatmap_resized)
            
            # Apply color map and overlay
            heatmap_color = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)
            superimposed = cv2.addWeighted(img_cv, 0.6, heatmap_color, 0.4, 0)
            
            st.image(superimposed, channels="BGR", caption="Red areas highlight model focus", use_container_width=True)
            st.info("The AI identifies specific textures or opacities in the highlighted regions to determine the result.")

    except Exception as e:
        st.error(f"Deployment Error: {e}")
        st.info("Tip: Double-check that your .h5 model file is uploaded to the same folder as this app.py file.")