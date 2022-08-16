import React from 'react';
import { Error } from './ImageErrorView.styled';

export default function ImageErrorView({ message }) {
  return <Error role="alert">{message}</Error>;
}
