import { Button, } from 'react-bootstrap';
import useStore from '../../../../store';
import { deletePhoto } from '../../../../utils/apiService';
import { Photo } from '../../../../model/model';

interface Props {
    photo: Photo;
}
const DeletePhotoButton: React.FC<Props> = ({ photo }) => {
    const { setPhotos, photos } = useStore();

    async function deletePicture(photoId: string) {
        const response = await deletePhoto(photoId);
        if (!response) {
            const newPhotos = photos.filter(photo => photo.id !== photoId)
            setPhotos(newPhotos);
        }
    }

    return (
        <Button onClick={() => deletePicture(photo.id)} className='my-2'>Delete</Button>
    );
};

export default DeletePhotoButton;
