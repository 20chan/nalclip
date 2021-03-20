import useSWR from 'swr';
import copy from 'copy-to-clipboard';
import { Clip } from '../interfaces';
import React from 'react';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Divider, Header, Loader, Table } from 'semantic-ui-react';

const IndexPage = () => {
  const fetcher = async (url: string) => await (await fetch(url)).json();
  const { data, revalidate } = useSWR<Clip[], any>('/api/clip', fetcher, {
    refreshInterval: 1000,
  });
  const clipsDisplay = data
    ? (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>id</Table.HeaderCell>
          <Table.HeaderCell>createdAt</Table.HeaderCell>
          <Table.HeaderCell>content</Table.HeaderCell>
          <Table.HeaderCell>COPY</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          data.map(x =>
            <Table.Row key={x.id}>
              <Table.Cell>{x.id}</Table.Cell>
              <Table.Cell>{x.createdAt}</Table.Cell>
              <Table.Cell>{x.content}</Table.Cell>
              <Table.Cell><Button onClick={() => copy(x.content)}>COPY</Button></Table.Cell>
            </Table.Row>
          )
        }
      </Table.Body>
    </Table>
      )
    : <Loader>loading</Loader>

  const style = {
    h1: {
      marginTop: '1em',
    },
  };
  return (
    <div>
      <Head>
        <title>nalclip</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header as='h1' textAlign='center' style={style.h1}>nalclip</Header>
      <Container textAlign='right'>
        <Button basic color='blue' onClick={revalidate}>refresh</Button>
      </Container>
      <Divider />
      <Container>
        { clipsDisplay }
      </Container>
    </div>
  );
}

export default IndexPage
