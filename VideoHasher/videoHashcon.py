import hashlib
def hash_video(filename):
    """Generate a SHA-256 hash of the given video file."""
    sha256_hash = hashlib.sha256() 
    with open(filename, 'rb') as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    
    return sha256_hash.hexdigest() 
video_hash = hash_video(r'D:\Project FNA\VideoHasher\elon.mp4')
print("The SHA-256 hash of the video is:", video_hash)
