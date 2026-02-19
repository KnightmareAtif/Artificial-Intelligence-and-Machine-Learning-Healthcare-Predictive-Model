import streamlit as st
import tensorflow as tf
import numpy as np
import cv2
import os
from PIL import Image

# 1. Configuration & Labels
st.set_page_config(page_title="Lung Disease AI", layout="wide")
CLASS_NAMES = ['Covid-19', 'Normal', 'Viral Pneumonia', 'Bacterial Pneumonia']

@st.cache_resource
def load_my_model():
    # Absolute pathing to avoid FileNotFoundError
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, 'lung_disease_model.h5')
    return tf.keras.models.load_model(model_path)

def get_gradcam(img_array, model, last_conv_layer_name):
    # Fixed the indexing issue here to avoid TypeError
    grad_model = tf.keras.models.Model(
        [model.inputs], [model.get_layer(last_conv_layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:
        last_conv_layer_output, preds = grad_model(img_array)
        
        # Ensure preds is treated as a tensor/array correctly
        pred_index = tf.argmax(preds[0])
        class_channel = preds[:, pred_index]

    grads = tape.gradient(class_channel, last_conv_layer_output)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    heatmap = tf.maximum(heatmap, 0) / tf.reduce_max(heatmap)
    return heatmap.numpy()

# --- UI Layout ---
st.title("🫁 Lung Disease Detection with Grad-CAM")
st.write("Visualizing the AI's diagnostic focus using Class Activation Maps.")

uploaded_file = st.file_uploader("Upload X-ray", type=["jpg", "png", "jpeg"])

if uploaded_file:
    # 1. Image Preprocessing
    img = Image.open(uploaded_file).convert('RGB')
    img_res = img.resize((256, 256))
    img_array = np.expand_dims(tf.keras.preprocessing.image.img_to_array(img_res), axis=0) / 255.0

    try:
        # 2. Load Model and Predict
        model = load_my_model()
        preds = model.predict(img_array)
        
        # Taking the first prediction in the batch
        main_preds = preds[0]
        pred_idx = np.argmax(main_preds)
        label = CLASS_NAMES[pred_idx]
        confidence = main_preds[pred_idx] * 100
        
        # 3. Create Columns for Display
        col1, col2 = st.columns(2)
        
        with col1:
            st.header("Diagnostic Result")
            if label == 'Normal':
                st.success(f"**Prediction:** {label}")
            else:
                st.error(f"**Prediction:** {label}")
            st.metric("Confidence", f"{confidence:.2f}%")
            st.image(img, caption="Original X-ray", use_container_width=True)
        
        with col2:
            st.header("Model Thinking (Heatmap)")
            # 'conv5_block3_out' is the target layer for ResNet50
            heatmap = get_gradcam(img_array, model, 'conv5_block3_out')
            
            # 4. Superimpose Heatmap on Image
            img_cv = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            heatmap_resized = cv2.resize(heatmap, (img_cv.shape[1], img_cv.shape[0]))
            heatmap_uint8 = np.uint8(255 * heatmap_resized)
            heatmap_color = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)
            
            superimposed = cv2.addWeighted(img_cv, 0.6, heatmap_color, 0.4, 0)
            st.image(superimposed, channels="BGR", caption="Red areas show high AI focus", use_container_width=True)

    except Exception as e:
        st.error(f"Error: {e}")