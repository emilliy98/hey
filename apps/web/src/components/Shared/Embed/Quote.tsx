import QuotedPublication from '@components/Publication/QuotedPublication';
import type { Publication } from '@hey/lens';
import { usePublicationQuery } from '@hey/lens';
import type { FC } from 'react';

import PublicationShimmer from '../Shimmer/PublicationShimmer';
import Wrapper from './Wrapper';

interface QuoteProps {
  publicationId: string;
}

const Quote: FC<QuoteProps> = ({ publicationId }) => {
  const { data, loading, error } = usePublicationQuery({
    variables: { request: { publicationId } }
  });

  if (loading) {
    return (
      <Wrapper zeroPadding>
        <PublicationShimmer showActions={false} quoted />
      </Wrapper>
    );
  }

  if (error || !data?.publication) {
    return null;
  }

  return (
    <Wrapper zeroPadding>
      <QuotedPublication publication={data.publication as Publication} />
    </Wrapper>
  );
};

export default Quote;
