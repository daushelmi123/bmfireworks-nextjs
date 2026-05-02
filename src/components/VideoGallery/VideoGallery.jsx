'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './VideoGallery.css';

const VideoGallery = () => {
  const videos = [
    {
      id: 'B080',
      title: '5" 138 Shoot Cake - GEMPAK!',
      thumbnail: "https://emofly.b-cdn.net/hbd_exvhac6ayb3ZKT/width:1080/plain/https://storage.googleapis.com/takeapp/media/cm3icgvj700010cl3am9ycbgj.png",
      videoUrl: "https://storage.googleapis.com/takeapp/media/cm4l31g5200010cmq8qeahfje.mp4",
      description: "138 tembakan berturut-turut! Perfect untuk sambutan Merdeka!"
    },
    {
      id: 'B045',
      title: "Thunder Clap Besar",
      thumbnail: "https://emofly.b-cdn.net/hbd_exvhac6ayb3ZKT/width:1080/plain/https://storage.googleapis.com/takeapp/media/cm3h79mq900030cjrb8lzarvu.png",
      videoUrl: "https://storage.googleapis.com/takeapp/media/cm3h7a2v200010cl4bh3jbbyu.mp4",
      description: "超级响天雷 - Bunyi kuat macam petir! Merdeka vibes!"
    },
    {
      id: 'B056',
      title: '4" 49 Shoot Cake',
      thumbnail: "https://emofly.b-cdn.net/hbd_exvhac6ayb3ZKT/width:1080/plain/https://storage.googleapis.com/takeapp/media/cm3i5o94n00030cjuboo58byp.png",
      videoUrl: "https://storage.googleapis.com/takeapp/media/cm4shhzku000903mt4o59h96b.mp4",
      description: "4寸高49发 - 49 shots spectacular display!"
    },
    {
      id: 'B046',
      title: "Rocket Mixed (1.0\" + 1.2\")",
      thumbnail: "https://emofly.b-cdn.net/hbd_exvhac6ayb3ZKT/width:1080/plain/https://storage.googleapis.com/takeapp/media/cm3h7k4rf00060cjtaky87kzw.png",
      videoUrl: "https://storage.googleapis.com/takeapp/media/cm3h7l9ao00050cl991x22ue6.mp4",
      description: "混合火箭 - Classic rocket terbang tinggi! Merdeka celebration!"
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVideo]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="videos" className="video-gallery">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Video Gallery</h2>
          <p className="section-subtitle">Watch our fireworks product demonstrations</p>
        </motion.div>

        <motion.div
          className="video-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {videos.map(video => (
            <motion.div
              key={video.id}
              className="video-card"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => setSelectedVideo(video)}
            >
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={`${video.title} - BMFireworks Premium Fireworks Malaysia Video Demo`} />
                <div className="video-overlay">
                  <motion.div
                    className="play-button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ▶
                  </motion.div>
                </div>
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedVideo && (
          <div
            className="video-modal-overlay"
            onClick={() => {
              setSelectedVideo(null);
              if (videoRef.current) videoRef.current.pause();
            }}
          >
            <div
              className="video-modal-simple"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal-btn" onClick={() => {
                setSelectedVideo(null);
                if (videoRef.current) videoRef.current.pause();
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <video
                ref={videoRef}
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                loop
                playsInline
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoGallery;
