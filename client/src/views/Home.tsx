import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Modal, Spin } from 'antd';
import { BookOutlined, CommentOutlined } from '@ant-design/icons';
import axios from 'axios';

type Book = {
  book_id: number;
  book_title: string;
  author: string;
  genre: string;
};

type Review = {
  review: string;
  login: string;
};

type Discussion = {
  message: string;
  login: string;
};

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
  const [loadingDiscussions, setLoadingDiscussions] = useState<boolean>(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  useEffect(() => {
    // Загружаем список книг при монтировании компонента
    axios.get('http://localhost:3001/books')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  const loadReviews = (bookId: number) => {
    setLoadingReviews(true);
    axios.get(`http://localhost:3001/books/${bookId}/reviews`)
      .then(response => {
        setReviews(response.data);
        setLoadingReviews(false);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setLoadingReviews(false);
      });
  };

  const loadDiscussions = (bookId: number) => {
    setLoadingDiscussions(true);
    axios.get(`http://localhost:3001/books/${bookId}/discussions`)
      .then(response => {
        setDiscussions(response.data);
        setLoadingDiscussions(false);
      })
      .catch(error => {
        console.error('Error fetching discussions:', error);
        setLoadingDiscussions(false);
      });
  };

  const handleViewDetails = (bookId: number) => {
    setSelectedBookId(bookId);
    loadReviews(bookId);
    loadDiscussions(bookId);
  };

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h2>Библиотечный форум</h2>
          <Row gutter={[16, 16]}>
            {books.map((book) => (
              <Col key={book.book_id} span={8}>
                <Card
                  title={book.book_title}
                  extra={<Button onClick={() => handleViewDetails(book.book_id)} icon={<BookOutlined />}>Просмотр</Button>}
                  style={{ width: 300 }}
                >
                  <p><strong>Автор:</strong> {book.author}</p>
                  <p><strong>Жанр:</strong> {book.genre}</p>
                </Card>
              </Col>
            ))}
          </Row>

          <Modal
            title="Обзор и Обсуждения"
            open={selectedBookId !== null}
            onCancel={() => setSelectedBookId(null)}
            footer={null}
            width={800}
          >
            {loadingReviews || loadingDiscussions ? (
              <Spin size="large" />
            ) : (
              <>
                <h3>Обзоры книги:</h3>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index}>
                      <p><strong>{review.login}</strong>: {review.review}</p>
                    </div>
                  ))
                ) : (
                  <p>Обзоров пока нет.</p>
                )}

                <h3>Обсуждения книги:</h3>
                {discussions.length > 0 ? (
                  discussions.map((discussion, index) => (
                    <div key={index}>
                      <p><strong>{discussion.login}</strong>: {discussion.message}</p>
                    </div>
                  ))
                ) : (
                  <p>Обсуждений пока нет.</p>
                )}
              </>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default Home;
