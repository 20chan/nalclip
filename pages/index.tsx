import useSWR from 'swr';
import copy from 'copy-to-clipboard';
import { Clip } from '../interfaces';
import React from 'react';
import Head from 'next/head';

const IndexPage = () => {
  const fetcher = async (url: string) => await (await fetch(url)).json();
  const { data, revalidate } = useSWR<Clip[], any>('/api/clip', fetcher, {
    refreshInterval: 1000,
  });
  const clipsDisplay = data
    ? (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>createdAt</th>
          <th>content</th>
          <th>COPY</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map(x =>
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.createdAt}</td>
              <td>{x.content}</td>
              <td><button onClick={() => copy(x.content)}>COPY</button></td>
            </tr>
          )
        }
      </tbody>
    </table>
      )
    : <i>uhoh</i>;
  return (
    <div>
      <Head>
        <title>nalclip</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <h1>nalclip</h1>
      <button onClick={revalidate}>refresh</button>
      <ul>
        { clipsDisplay }
      </ul>
    </div>
  );
}

export default IndexPage
