import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
import numpy as np
import cv2
import os

class VideoDataset(Dataset):
    def init(self, video_folder, labels, sequence_length=30):
        self.video_folder = video_folder
        self.labels = labels
        self.sequence_length = sequence_length
        self.video_filenames = sorted(os.listdir(video_folder))

        if len(self.video_filenames) != len(self.labels):
            raise ValueError("Number of video files does not match the number of labels.")

    def len(self):
        return len(self.video_filenames)

    def getitem(self, idx):
        video_path = os.path.join(self.video_folder, self.video_filenames[idx])
        frames = self.load_video_frames(video_path)
        label = self.labels[idx]
        return frames, label

    def load_video_frames(self, video_path):
        cap = cv2.VideoCapture(video_path)
        frames = []
        while len(frames) < self.sequence_length:
            ret, frame = cap.read()
            if not ret:
                break
            frame = cv2.resize(frame, (224, 224))  
            frame = frame.transpose(2, 0, 1)  
            frames.append(frame)
        cap.release()
        while len(frames) < self.sequence_length:
            frames.append(np.zeros((3, 224, 224))) 
        return np.array(frames, dtype=np.float32)
class CNN_LSTM_Model(nn.Module):
    def init(self, num_classes=2, hidden_size=256, sequence_length=30):
        super(CNN_LSTM_Model, self).init()
        self.sequence_length = sequence_length
        self.cnn = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(128, 256, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(256, 512, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Flatten()
        )

        self.lstm = nn.LSTM(input_size=512 * 14 * 14, hidden_size=hidden_size, num_layers=1, batch_first=True)


        self.fc = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        batch_size, seq_len, C, H, W = x.shape
        cnn_features = []

        for i in range(seq_len):
            frame = x[:, i, :, :, :] 
            frame = self.cnn(frame)
            cnn_features.append(frame)

        cnn_features = torch.stack(cnn_features, dim=1) 
        lstm_out, _ = self.lstm(cnn_features)

        final_output = lstm_out[:, -1, :]
        out = self.fc(final_output)
        return out

num_classes = 2
hidden_size = 256
sequence_length = 30
model = CNN_LSTM_Model(num_classes=num_classes, hidden_size=hidden_size, sequence_length=sequence_length)

def detect_tampering(model, video_path):
    frames = extract_frames(video_path, sequence_length=sequence_length) 
    frames = torch.tensor(frames).unsqueeze(0)  
   
    model.eval()  
    with torch.no_grad():
        output = model(frames)


    _, predicted_class = torch.max(output, 1)
    return "Real" if predicted_class.item() == 0 else "Fake"

def extract_frames(video_path, sequence_length=30):
    cap = cv2.VideoCapture(video_path)
    frames = []
    while len(frames) < sequence_length:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, (224, 224))  
        frame = frame.transpose(2, 0, 1)
        frames.append(frame)
    cap.release()

    while len(frames) < sequence_length:
        frames.append(np.zeros((3, 224, 224))) 
    return np.array(frames, dtype=np.float32)
video_path = r"C:\Users\Prayers\OneDrive\Desktop\samplevideo\elon.mp4"

result = detect_tampering(model, video_path)
print(f"The video is: {result}")