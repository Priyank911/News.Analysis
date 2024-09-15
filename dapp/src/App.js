import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Paper, Box, Link, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { connectToBlockchain } from './blockchain';
import { analyzeVideo } from './aiAnalysis';
import { jsPDF } from 'jspdf'; 

function App() {
    const [videoHash, setVideoHash] = useState('');
    const [caption, setCaption] = useState('');
    const [tag, setTag] = useState('');
    const [status, setStatus] = useState('');
    const [account, setAccount] = useState('');
    const [agreement, setAgreement] = useState(null);

    const handleVideoUpload = async () => {
        const { success, contract } = await connectToBlockchain();
        if (!success) {
            setStatus('Error connecting to blockchain');
            return;
        }

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0]);

        const aiResult = await analyzeVideo(videoHash);
        if (!aiResult.isValid) {
            setStatus('Video analysis failed. Upload rejected.');
            return;
        }

        try {
            const receipt = await contract.methods.uploadVideo(videoHash, caption, tag).send({ from: accounts[0] });
            setStatus(`Video uploaded successfully!`);

            const newAgreement = {
                videoHash,
                caption,
                tag,
                transactionHash: receipt.transactionHash,
                deploymentTime: new Date().toLocaleString(),
                contractKey: contract.options.address,
            };
            setAgreement(newAgreement);

            generatePDF(newAgreement);

        } catch (error) {
            console.error('Error uploading video:', error);
            setStatus('Error uploading video to blockchain');
        }
    };

    const generatePDF = (agreementData) => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text('Video Upload Agreement', 20, 20);
        doc.setFontSize(12);
        doc.text(`Video Hash: ${agreementData.videoHash}`, 20, 40);
        doc.text(`Caption: ${agreementData.caption}`, 20, 50);
        doc.text(`Tag: ${agreementData.tag}`, 20, 60);
        doc.text(`Transaction Hash: ${agreementData.transactionHash}`, 20, 70);
        doc.text(`Deployment Time: ${agreementData.deploymentTime}`, 20, 80);
        doc.text(`Contract Key: ${agreementData.contractKey}`, 20, 90);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 110);
        doc.save('VideoUploadAgreement.pdf');
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
                        sx={{ wordBreak: 'break-all' }}
                    />
                    <TextField
                        fullWidth
                        label="Enter Caption"
                        variant="outlined"
                        margin="normal"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Enter Main Tag"
                        variant="outlined"
                        margin="normal"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
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
                    </Box>
                </Box>

                {status && (
                    <Typography variant="body1" color={status.includes('Error') ? 'error' : 'success'} align="center" sx={{ mt: 2 }}>
                        {status} {agreement && (
                            <>
                                <br/>
                                Tx Hash: 
                                <Link href={`https://etherscan.io/tx/${agreement.transactionHash}`} target="_blank" rel="noopener" sx={{ fontWeight: 'bold', wordBreak: 'break-all' }}>
                                    {agreement.transactionHash}
                                </Link>
                            </>
                        )}
                    </Typography>
                )}

                {account && (
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                        Connected Account: {account}
                    </Typography>
                )}

                {agreement && (
                    <>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Box sx={{ mt: 3, wordBreak: 'break-all' }}>
                            <Typography variant="h6" gutterBottom align="center">
                                Agreement Details
                            </Typography>
                            <Typography variant="body1" gutterBottom>Video Hash: {agreement.videoHash}</Typography>
                            <Typography variant="body1" gutterBottom>Caption: {agreement.caption}</Typography>
                            <Typography variant="body1" gutterBottom>Tag: {agreement.tag}</Typography>
                            <Typography variant="body1" gutterBottom>Deployment Time: {agreement.deploymentTime}</Typography>
                            <Typography variant="body1" gutterBottom>Contract Key: {agreement.contractKey}</Typography>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
}

export default App;
