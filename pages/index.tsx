import Layout from '../components/Layout'
import { Clip } from '../interfaces';
import useSWR from 'swr';

const IndexPage = () => {
  const { data } = useSWR<Clip[], any>('/api/clip');
  const clipsDisplay = data
    ? data.map(x => <li key={x.id}>{x.id} {x.content}</li>)
    : <i>uhoh</i>;
  return (
    <Layout title="nalcli">
      <h1>nalclip</h1>
      <ul>
        { clipsDisplay }
      </ul>
    </Layout>
  );
}

export default IndexPage
