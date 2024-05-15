import useStore from '../../../../store';
import { Photo } from '../../../../model/model';
import { replacePhoto } from '../../../../utils/apiService';

interface Props {
    photo: Photo;
}
const ReplacePhotoButton: React.FC<Props> = ({ photo }) => {
    const { setPhotos, photos } = useStore();

    async function replacePicture(e, photoId: number) {
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        const newPhoto = await replacePhoto(photoId, fileUrl);
        if (newPhoto) {
            const updatedPhotos = photos.map(photo =>
                photo.id === photoId
                    ? { ...photo, url: newPhoto.url, thumbnailUrl: newPhoto.url }
                    : photo
            );
            setPhotos(updatedPhotos);
        }
    }

    return (
        <input type="file" onChange={(e) => replacePicture(e, photo.id)} />
    );
};

export default ReplacePhotoButton;
