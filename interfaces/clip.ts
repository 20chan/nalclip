import * as yup from 'yup';

export interface Clip {
  id: number;
  createdAt: Date;
  content: string;
}

export interface ClipInput {
  content: string;
}

export const clipInputSchema = yup.object().shape<ClipInput>({
  content: yup.string().required(),
});
