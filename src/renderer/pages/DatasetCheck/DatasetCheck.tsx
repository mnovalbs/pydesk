import { Button, Input, makeStyles } from '@fluentui/react-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@fluentui/react-components/unstable';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BoxScroll } from 'renderer/components/Common';
import PageWrapper from 'renderer/components/Common/PageWrapper';

const useStyles = makeStyles({
  input: {
    width: '100%',
  },
  saveButton: {
    marginTop: '10px',
  },
});

const DatasetCheck = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const [header, setHeader] = useState<any[]>([]);
  const [body, setBody] = useState<any[][]>([]);

  const updateHeader = (index: number, value: string) => {
    setHeader((currentHeader) => {
      const newHeader = [...currentHeader];
      newHeader[index] = value;
      return newHeader;
    });
  };

  const saveDataset = () => {
    const dataset = [header, ...body];
    window.electron.ipcRenderer.sendMessage('saveDataset', [
      projectId,
      dataset,
    ]);
    navigate(-1);
  };

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('showDataset', [projectId]);
    window.electron.ipcRenderer.once('showDataset', ({ data }) => {
      setHeader(data[0] || []);
      setBody(data.slice(1) || []);
    });
  }, [projectId]);

  return (
    <PageWrapper title="Check Dataset">
      <BoxScroll>
        <Table>
          <TableHeader>
            <TableRow>
              {header.map((column, index) => (
                <TableHeaderCell key={`header-${index + 1}`}>
                  <Input
                    value={column}
                    className={classes.input}
                    onChange={(e) => updateHeader(index, e.target.value)}
                  />
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {body.map((row, index) => (
              <TableRow key={`row-${index + 1}`}>
                {row.map((column, columnIndex) => (
                  <TableCell key={`column-${columnIndex + 1}`}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          className={classes.saveButton}
          appearance="primary"
          onClick={saveDataset}
        >
          Save Dataset
        </Button>
      </BoxScroll>
    </PageWrapper>
  );
};

export default DatasetCheck;
