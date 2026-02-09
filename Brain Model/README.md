The notebook focuses on the development of deep learning pipelines for classifying MRI scans into Tumor or No Tumor categories. By leveraging transfer learning, the system identifies pathological patterns and structural anomalies in brain tissue.
### Key Features
- Multi-Model Architecture: Implements and compares five ImageNet-pretrained CNN architectures: InceptionV3, ResNet50, EfficientNetB0, DenseNet121, and Xception.
- Comprehensive Preprocessing: Includes automated image resizing to $224 \times 224$ pixels, normalization, and label encoding to ensure high numerical stability.
- In-depth EDA: Features visual and statistical analysis of MRI images, including Average Image Brightness per class and RGB Channel Intensity distribution to justify feature separability.
- Performance Metrics: Evaluates models using Accuracy, Loss graphs, and Confusion Matrices to identify biases and ensure clinical reliability.
### Technical StackFrameworks:
- TensorFlow, Keras.
- Libraries: NumPy, Pandas, OpenCV, Scikit-learn, Matplotlib, Seaborn.
- Technique: Transfer Learning with custom classification heads (Global Average Pooling, Dropout, and Softmax output).
- ### Results Summary:
While multiple models were tested, InceptionV3 emerged as the most reliable architecture for this specific task, offering the best balance between precision and recall for detecting localized abnormalities.
### Setup & Execution in Google Colab
- Upload the Notebook and Dataset
  - Go to Google Colab.
  - Upload your Brain.ipynb file.
  - Upload Dataset: You can upload the dataset directly to the Colab session storage or, preferably, upload it to your Google Drive for persistence.
- Configure Runtime
  - Go to Runtime > Change runtime type.
  - Select T4 GPU (or any available GPU) under "Hardware accelerator."
- Connect Google Drive (If dataset is on Drive)
  - If your data is in Drive, add a cell at the top of the notebook to mount it:
```python
from google.colab import drive
drive.mount('/content/drive')
```
- Update File Paths
  - Locate the cell where the dataset path is defined (e.g., DATASET_PATH = '...').
  - Update the path to match your Colab or Drive directory structure.
- Run All Cells
  - Go to Runtime > Run all.

The notebook will perform image resizing to $224 \times 224$ pixels , normalize pixel values , and begin the training process for the CNN models.### Expected OutputTraining History: You will see accuracy and loss graphs for each model (e.g., InceptionV3, ResNet50).Evaluation: The notebook will generate confusion matrices to show the classification performance between Tumor and No Tumor classes.
