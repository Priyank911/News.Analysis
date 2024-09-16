# **Project FNA - Decentralized Video Upload and Verification System**

Welcome to **Project FNA.ai**! This is a decentralized application (dApp) designed to provide a secure platform for uploading, analyzing, and verifying the authenticity of videos. The system utilizes **AI models** to ensure accuracy and **blockchain technology** to provide an immutable and transparent record of validated content.

![Project Overview](https://github.com/Priyank911/News.Analysis/blob/main/Material/flowchart.png)

---

## **Features**

### 1. **Video Upload**
Our dApp allows users to upload videos along with captions and taglines. The uploaded content is analyzed by AI for authenticity, and if validated, it is stored securely on the blockchain.

![Video Upload Flow](https://github.com/Priyank911/News.Analysis/blob/main/Material/videouploaded.jpg)

Steps:
1. User selects a video file to upload.
2. AI-based model analyzes the video.
3. Upon validation, the video, caption, and tagline are stored on the blockchain.

---

### 2. **Extension (Credibility Checker)**
A handy browser extension enables users to check the credibility of news articles by hovering over them. It provides instant feedback on authenticity by cross-referencing with trusted sources.

![Credibility Checker](https://github.com/Priyank911/News.Analysis/blob/main/Material/CreditChecker.png)

Steps:
1. Users hover over a news article.
2. The extension analyzes the article’s content.
3. Instant feedback is provided, indicating if the article contains misinformation.

---

### 3. **Video Verification System**
Users can upload a news-related video, and our AI model will verify its authenticity by detecting signs of tampering, deepfakes, and other manipulations.

![Video Verification](https://github.com/Priyank911/News.Analysis/blob/main/Material/videoAnalysis.png)

Steps:
1. Upload the video.
2. AI analysis checks for deepfakes or manipulations.
3. Validation results are provided.

---

### 4. **Content Checker**
With the content checker, users can input a news headline or other textual content into a search bar to verify its authenticity. The system cross-references the text with trusted sources.

![Content Checker](https://github.com/Priyank911/News.Analysis/blob/main/Material/ContentAnalysis.png)

---

### 5. **Blockchain Integration**
Our system integrates blockchain technology to store validated videos and content in a decentralized and immutable way. It prevents redundancy by checking the blockchain for previously validated content before allowing new uploads.

Steps:
1. Content is uploaded.
2. The system checks if a similar validated video exists on the blockchain.
3. If found, the system updates the existing record. If not, a new entry is created.

![Blockchain Integration](https://github.com/Priyank911/News.Analysis/blob/main/Material/DAppai.png)

---

### 6. **Audio News Checker**
Users can upload a video or audio clip, and our system converts the audio into text. It then compares the transcript with news websites to check for authenticity.

---

### 7. **Agreement Generation**
After a successful video upload and verification, the system generates a contract containing the video, its metadata, the time of deployment, and the blockchain contract key. This serves as an immutable record of the upload process.

![Agreement](https://github.com/Priyank911/News.Analysis/blob/main/Material/agreement.png)
---

## **Project Structure**

```plaintext
/project-root
│
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── App.js
│   │   │   └── VideoForm.js
│   │   ├── blockchain/
│   │   │   ├── blockchain.js
│   │   │   └── contractABI.json
│   │   ├── ai/
│   │   │   └── aiModel.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── server/               # Backend server
│   ├── app.js            # Express server setup
│   ├── blockchain/
│   │   └── blockchainServer.js  # Handles blockchain interactions
│   ├── ai/
│   │   └── aiServer.js          # Handles AI video analysis
│   └── package.json
│
└── README.md
```

---

## **Technology Stack**

### **Frontend**
- **React**: For a fast, scalable, and modern user interface.
- **Material-UI**: For a sleek, responsive design.

### **Backend**
- **Express.js**: To handle server-side logic and API requests.
- **Web3.js**: For blockchain interactions.

### **Blockchain**
- **Ethereum Smart Contracts**: Written in Solidity, handling video uploads and storage.
- **IPFS**: Used for decentralized video storage off-chain.

### **AI**
- **Python AI Libraries**: (TensorFlow, PyTorch) Used for video and audio analysis to verify authenticity.

---

## **How to Run the Project**

### **Prerequisites**
- Node.js and npm installed.
- Python (for AI processing).
- A local Ethereum node or testnet setup.

### **Steps to Run**

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/News.Analysis.git
    ```

2. **Install Dependencies**
    Navigate to the project directory and install the required packages:
    ```bash
    cd News.Analysis
    npm install
    ```

3. **Start the Frontend**
    ```bash
    cd client
    npm start
    ```

4. **Start the Backend**
    Open another terminal and start the server:
    ```bash
    cd server
    npm start
    ```

5. **Run AI Services**
    Ensure Python and necessary libraries are installed, and run the AI services for video analysis.

6. **Test Blockchain Integration**
    Ensure you have a test Ethereum node running, then interact with the dApp using the integrated Web3 interface.

---

## **Contributing**
We welcome contributions to improve the project. To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes and open a pull request.

---

## **Contact**
For any queries, feel free to reach out at: [developer.priyank@gmail.com](developer.priyank@gmail.com)

---
