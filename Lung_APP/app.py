import streamlit as st
import tensorflow as tf
import numpy as np
import cv2
from PIL import Image

# 1. Configuration & Labels
st.set_page_config(page_title="Lung Disease AI", layout="wide")
CLASS_NAMES = ['Covid-19', 'Normal', 'Viral Pneumonia', 'Bacterial Pneumonia']

@st.cache_resource
def load_model():
    return tf.keras.models.load_model('lung_disease_model.h5')

def get_gradcam(img_array, model, last_conv_layer_name):
    grad_model = tf.keras.models.Model(
        [model.inputs], [model.get_layer(last_conv_layer_name).output, model.output]
    )
    with tf.GradientTape() as tape:
        last_conv_output, preds = grad_model(img_array)
        class_channel = preds[:, np.argmax(preds[0])]
    
    grads = tape.gradient(class_channel, last_conv_output)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    heatmap = last_conv_output[0] @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0) / tf.reduce_max(heatmap)
    return heatmap.numpy()

# UI Layout
st.title("🫁 Lung Disease Detection with Grad-CAM")
uploaded_file = st.file_uploader("Upload X-ray", type=["jpg", "png"])

if uploaded_file:
    img = Image.open(uploaded_file).convert('RGB')
    # Preprocessing (256x256 as per notebook)
    img_res = img.resize((256, 256))
    img_array = np.expand_dims(tf.keras.preprocessing.image.img_to_array(img_res), axis=0) / 255.0

    model = load_model()
    preds = model.predict(img_array)
    label = CLASS_NAMES[np.argmax(preds)]
    
    col1, col2 = st.columns(2)
    with col1:
        st.header("Result")
        st.success(f"Prediction: {label}")
        st.image(img, use_container_width=True)
    
    with col2:
        st.header("Model Thinking (Heatmap)")
        # 'conv5_block3_out' is the default for ResNet50
        heatmap = get_gradcam(img_array, model, 'conv5_block3_out')
        heatmap = cv2.resize(heatmap, (img.size[0], img.size[1]))
        heatmap = np.uint8(255 * heatmap)
        heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
        superimposed = cv2.addWeighted(cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR), 0.6, heatmap, 0.4, 0)
        st.image(superimposed, channels="BGR", use_container_width=True)