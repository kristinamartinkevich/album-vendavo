import { Button, Col, Container, Image, OverlayTrigger, Popover, Row, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { Photo } from '../../../model/model.ts';
import { useParams } from 'react-router-dom';
import GoBackButton from '../../common/components/GoBackButton.tsx';
import { deletePhoto, fetchPhotos, replacePhoto, uploadPhoto } from '../../../utils/apiService.tsx';
import useStore from '../../../store';

function Album() {
    const { albumId } = useParams();
    const { setPhotos, setFile, photos, file } = useStore();

    async function addPhoto(e) {
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        const response = await uploadPhoto(fileUrl);
        const newPhoto: Photo = {
            albumId: Number(albumId),
            id: response.id,
            title: 'foo',
            url: response.url,
            thumbnailUrl: response.url,
        }
        const newPhotos = [...photos as Photo[], newPhoto];
        setPhotos(newPhotos);
        setFile(fileUrl);
    }

    async function replacePicture(e, photoId) {
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

    async function deletePicture(photoId: string) {
        const response = await deletePhoto(photoId)
        if (!response && photos) {
            const newPhotos = photos.filter(photo => photo.id !== photoId)
            setPhotos(newPhotos);
        }
    }

    const renderOverlay = (props: object, album: Photo) => (
        <Popover {...props}>
            <Popover.Header as="h3">{album.title}</Popover.Header>
            <Popover.Body>
                <Row className='justify-content-center'>
                    <Image alt={album.title} src={album.url} className='photo' />
                </Row>
            </Popover.Body>
        </Popover>
    );

    useEffect(() => {
        if (albumId) {
            fetchPhotos(albumId)
                .then(album => setPhotos(album));
        }
    }, [albumId]);

    return (
        <Container>
            <GoBackButton />
            <Row className='justify-content-center'>
                {photos ? (
                    <>
                        {photos?.map((photo: Photo) => (
                            <Col key={photo?.id}>
                                <OverlayTrigger
                                    overlay={(props) => renderOverlay(props, photo)}>
                                    <Image alt={photo?.title} src={photo?.thumbnailUrl} thumbnail />
                                </OverlayTrigger>
                                <Row>
                                    <Col>
                                        <Button onClick={() => deletePicture(photo.id)}>Delete</Button>
                                    </Col>
                                    <Col>
                                        <input type="file" onChange={(e) => replacePicture(e, photo.id)} />
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </>
                ) : (
                    <Spinner animation="border" />
                )}
            </Row>
            <Row>
                <input type="file" onChange={addPhoto} />
            </Row>
        </Container>
    );
};

export default Album;
