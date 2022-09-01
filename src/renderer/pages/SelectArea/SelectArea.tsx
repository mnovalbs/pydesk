import { Button, Input, Title3 } from '@fluentui/react-components';
import { FormEventHandler, useState } from 'react';
import PageWrapper from 'renderer/components/Common/PageWrapper';
import { ImageWrapper, InputWrapper } from './styled-components';

const SelectArea = () => {
  const [websiteUrl, setWebsiteUrl] = useState('https://www.tampil.online');
  const [imageUrl, setImageUrl] = useState('');

  const onFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    window.electron.ipcRenderer.sendMessage('createQrCode', [websiteUrl]);
    window.electron.ipcRenderer.once('createQrCode', setImageUrl);
  };

  return (
    <PageWrapper title="Check Area">
      <form onSubmit={onFormSubmit}>
        <Title3>Create QR Code from Python</Title3>
        <InputWrapper>
          <Input
            placeholder="Your website URL"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
          <Button type="submit" appearance="primary">
            Submit
          </Button>
        </InputWrapper>
      </form>

      <ImageWrapper>
        {imageUrl && (
          <img alt="mantap" src={`local-protocol://getMediaFile/${imageUrl}`} />
        )}
      </ImageWrapper>
    </PageWrapper>
  );
};

export default SelectArea;
