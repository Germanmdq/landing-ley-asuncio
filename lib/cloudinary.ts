export const getCloudinaryUrl = (publicId: string, transformations?: string) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

    if (transformations) {
        return `${baseUrl}/${transformations}/${publicId}`;
    }

    return `${baseUrl}/${publicId}`;
};
