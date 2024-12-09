// Convert Blob to base64 string
export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  // Convert base64 string back to Blob
  export const base64ToBlob = (base64: string): Promise<Blob> => {
    return fetch(base64).then(res => res.blob());
  };
  