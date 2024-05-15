import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GoBackButton from '../../common/components/GoBackButton.tsx';
import { fetchPhotos } from '../../../utils/apiService.tsx';
import useStore from '../../../store';
import PhotoCard from './PhotoCard.tsx';
import AddPhotoButton from './buttons/AddPhotoButton.tsx';
import SearchBar from './buttons/SearchBar.tsx';
import InfiniteScroll from 'react-infinite-scroll-component';

function Album() {
    const { albumId } = useParams();
    const { setPhotos, photos, setFilteredPhotos, offset, setOffset, hasMore, setHasMore } = useStore();

    useEffect(() => {
        if (albumId) {
            fetchPhotos(albumId)
                .then(album => {
                    setPhotos(album);
                    setFilteredPhotos(album);
                    setHasMore(album.length > album.length);
                });
        }
    }, [albumId]);

    const onScroll = () => {
        setOffset(prevOffset => prevOffset + 10);
    };

    return (
        <Container>
            <GoBackButton />
            <Row>
                <Col>
                    <SearchBar />
                </Col>
            </Row>
            <InfiniteScroll
                dataLength={photos?.length}
                next={onScroll}
                hasMore={hasMore}
                loader={<p>Загрузка...</p>}
                scrollThreshold={0.9}
            >
                <Row>
                    {photos ?
                        <PhotoCard /> :
                        <Spinner animation="border" />}
                </Row>
            </InfiniteScroll>
            <Row>
                <AddPhotoButton />
            </Row>
        </Container>
    );
};

export default Album;
