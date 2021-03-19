import useSWR from 'swr';
import copy from 'copy-to-clipboard';
import Layout from '../components/Layout'
import { Clip } from '../interfaces';

const IndexPage = () => {
  const { data, revalidate } = useSWR<Clip[], any>('/api/clip');
  const clipsDisplay = data
    ? data.map(x => <li key={x.id}>{x.id} {x.content} <button onClick={() => copy(x.content)}>COPY</button></li>)
    : <i>uhoh</i>;
  return (
    <Layout title="nalcli">
      <h1>nalclip</h1>
      <button onClick={revalidate}>refresh</button>
      <ul>
        { clipsDisplay }
      </ul>
    </Layout>
  );
}

export default IndexPage
