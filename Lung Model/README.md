# Lung Disease Detection using Deep Learning
This project focuses on the development of deep learning pipelines for classifying Chest X-rays into four distinct categories: Covid-19, Normal, Viral Pneumonia, and Bacterial Pneumonia. By leveraging transfer learning, the system identifies specific opacity patterns and structural anomalies in lung tissue.

## Key Features
- Advanced Model Architecture: Utilizes the ResNet50 architecture, an ImageNet-pretrained CNN, as the feature extractor to capture intricate radiological features.

- Medical Data Preprocessing: Includes automated image resizing to 256×256 pixels, normalization, and data augmentation to improve model generalization across different X-ray qualities.

- In-depth EDA: Features visual analysis of the dataset, including sample visualization with labels and distribution analysis to ensure the model understands the variance between different infection types.

- Performance Metrics: Evaluates models using Accuracy, Loss graphs, and Confusion Matrices to ensure clinical reliability and distinguish between viral and bacterial infections.

## Technical Stack
- Frameworks: TensorFlow, Keras.

- Libraries: NumPy, Pandas, OpenCV, Scikit-learn, Matplotlib, Seaborn.

- Technique: Transfer Learning with custom classification heads (Global Average Pooling, Dropout, and Softmax output).

## Results Summary
The ResNet50 model serves as a powerful baseline, effectively identifying pulmonary opacities. Through fine-tuning and adaptive learning rates, the pipeline achieves high sensitivity in detecting Covid-19 cases versus standard Viral or Bacterial Pneumonia.

## Setup & Execution in Google Colab
- 1. Upload the Notebook and Dataset
  - Go to Google Colab.

  - Upload your LungsFinal.ipynb file.

  - Upload Dataset: Upload your dataset to your Google Drive for persistence.

- 2. Configure Runtime
  - Go to Runtime > Change runtime type.

  - Select T4 GPU (or any available GPU) under "Hardware accelerator."

- 3. Connect Google Drive
  - If your data is in Drive, run the mounting cell at the top of the notebook:

```Python
from google.colab import drive
drive.mount('/content/drive')
```
- 4. Update File Paths
  - Locate the cell where the dataset path is defined (e.g., X_Ray_Directory = '...').

  - Update the path to match your Drive directory structure.

- 5. Run All Cells
  - Go to Runtime > Run all.

The notebook will perform image resizing to 256×256 pixels, normalize pixel values, and begin the training and fine-tuning process.

## Expected Output
- Training History: Accuracy and loss graphs for the ResNet50 model.

- Evaluation: The notebook will generate confusion matrices and a classification report to show the performance between the four lung condition classes.

- Model Export: A saved .keras or .h5 file ready for deployment in applications like Streamlit.
