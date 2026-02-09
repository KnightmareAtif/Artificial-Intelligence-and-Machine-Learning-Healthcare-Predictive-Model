This notebook is part of the AIML-HealthGuard project, an integrated platform designed to bridge the gap between high-accuracy AI models and clinical trust. It specifically addresses the Intelligence Layer for brain tumor detection, moving away from "black box" predictions toward transparent, image-based diagnostics.### Project OverviewThe notebook focuses on the development of deep learning pipelines for classifying MRI scans into Tumor or No Tumor categories. By leveraging transfer learning, the system identifies pathological patterns and structural anomalies in brain tissue.
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
