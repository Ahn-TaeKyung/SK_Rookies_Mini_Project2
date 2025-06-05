import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateProduct } from '../api/auth';
import { TextField, Button, Box, Typography } from '@mui/material';

const EditProductPage = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken"); // JWT 토큰
  const currentUser = useSelector((state) => state.auth.identityInfo); // 사용자 정보
//   console.log('Redux auth state:', useSelector(state => state.auth));
  // 실제론 axios.get(`/api/products/${product_id}`)로 가져와야 함
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    // 예제: 초기값 설정
    setFormData({
      title: '기존 상품 제목',
      description: '기존 설명입니다',
      price: '10000',
    });
  }, [product_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async () => {
  try {
    console.log('보내는 토큰:', token);
    const response = await updateProduct(product_id, formData, token);
    console.log('응답:', response);
    alert('상품이 성공적으로 수정되었습니다.');
    navigate(`/products/${product_id}`);
  } catch (err) {
    console.error('상품 수정 실패:', err);
    alert('수정 권한이 없거나 오류가 발생했습니다.');
  }
};

  return (
    <Box sx={{ px: 4, py: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        상품 수정
      </Typography>

      <TextField
        fullWidth
        label="제목"
        name="title"
        value={formData.title}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="설명"
        name="description"
        value={formData.description}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="가격"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        수정 완료
      </Button>
    </Box>
  );
};

export default EditProductPage;
