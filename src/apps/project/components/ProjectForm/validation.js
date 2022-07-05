import * as yup from 'yup';

import { extractYoutubeVideoId } from './utils';

export const generalInfoValidationSchema = yup.object().shape({
  category: yup.number().required('Это поле обязательное'),
  name: yup.string().required('Это поле обязательное')
    .min(5, 'Минимальная длина строки 5 символов'),
  description: yup.string().required('Это поле обязательное')
    .min(20, 'Минимальная длина строки 20 символов')
});


export const youtubeVideoValidationSchema = yup.object().shape({
  youtube_video_url: yup.string().url('Значение должноо быть ссылкой')
    .test(
      'is_valid_youtube_video_url',
      'Значение должно быть валидной ссылкой на видео YouTube',
      (value) => {
        return !!extractYoutubeVideoId(value)
      }
    )
});
