export const downloadFile = async (url: string, fileName: string) => {
  try {
    setTimeout(() => {
      window.open(url, '_blank');
    });
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
};
