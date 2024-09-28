import React, { createContext, useState, useContext, ReactNode } from 'react';

interface VideoContextType {
  isVideoOpen: boolean;
  openVideo: () => void;
  closeVideo: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => {
    console.log("Opening video"); // Thêm log này
    setIsVideoOpen(true);
  };
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <VideoContext.Provider value={{ isVideoOpen, openVideo, closeVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};