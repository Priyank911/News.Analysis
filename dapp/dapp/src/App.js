import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { connectToBlockchain } from './blockchain';

function App() {
    const [videoHash, setVideoHash] = useState('');
    const [status, setStatus] = useState('');
    const [account, setAccount] = useState('');
    const [videoMetadata, setVideoMetadata] = useState(null);

    const handleVideoUpload = async () => {
        const { success, contract } = await connectToBlockchain();
        if (!success) {
            setStatus('Error connecting to blockchain');
            return;
        }

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0]);

        try {
            const receipt = await contract.methods.uploadVideo(videoHash).send({ from: accounts[0] });
            setStatus(`Video uploaded successfully! Tx Hash: ${receipt.transactionHash}`);
        } catch (error) {
            console.error('Error uploading video:', error);
            setStatus('Error uploading video to blockchain');
        }
    };

    const fetchVideoMetadata = async () => {
        const { success, contract } = await connectToBlockchain();
        if (!success) {
            setStatus('Error connecting to blockchain');
            return;
        }

        try {
            const videoData = await contract.methods.getVideo(videoHash).call();
            setVideoMetadata({
                hash: videoData[0],
                timestamp: new Date(videoData[1] * 1000).toLocaleString(),
                uploader: videoData[2],
            });
        } catch (error) {
            console.error('Error fetching video metadata:', error);
            setStatus('Error fetching video metadata from blockchain');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Blockchain Video Tracking
                </Typography>
                <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <TextField
                        fullWidth
                        label="Enter Video Hash"
                        variant="outlined"
                        margin="normal"
                        value={videoHash}
                        onChange={(e) => setVideoHash(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleVideoUpload}
                            sx={{ flexGrow: 1, mr: 1 }}
                        >
                            Upload Video to Blockchain
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={fetchVideoMetadata}
                            sx={{ flexGrow: 1, ml: 1 }}
                        >
                            Fetch Video Metadata
                        </Button>
                    </Box>
                </Box>
                {status && (
                    <Typography variant="body1" color={status.includes('Error') ? 'error' : 'success'} align="center" sx={{ mt: 2 }}>
                        {status}
                    </Typography>
                )}
                {account && (
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                        Connected Account: {account}
                    </Typography>
                )}
                {videoMetadata && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Video Metadata
                        </Typography>
                        <Typography variant="body1">Video Hash: {videoMetadata.hash}</Typography>
                        <Typography variant="body1">Timestamp: {videoMetadata.timestamp}</Typography>
                        <Typography variant="body1">Uploader: {videoMetadata.uploader}</Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}

export default App;
