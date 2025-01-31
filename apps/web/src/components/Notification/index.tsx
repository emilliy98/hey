import MetaTags from '@components/Common/MetaTags';
import NotLoggedIn from '@components/Shared/NotLoggedIn';
import { APP_NAME } from '@hey/data/constants';
import { PAGEVIEW } from '@hey/data/tracking';
import { Leafwatch } from '@lib/leafwatch';
import { t } from '@lingui/macro';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';
import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';

import FeedType from './FeedType';
import List from './List';
import Settings from './Settings';

const Notification: FC = () => {
  const {
    query: { type }
  } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [feedType, setFeedType] = useState(
    type &&
      ['all', 'mentions', 'comments', 'likes', 'collects'].includes(
        type as string
      )
      ? type.toString().toUpperCase()
      : 'ALL'
  );

  useEffectOnce(() => {
    Leafwatch.track(PAGEVIEW, { page: 'notifications' });
  });

  if (!currentProfile) {
    return <NotLoggedIn />;
  }

  return (
    <div className="flex grow justify-center px-0 py-8 sm:px-6 lg:px-8">
      <MetaTags title={t`Notifications • ${APP_NAME}`} />
      <div className="w-full max-w-4xl space-y-3">
        <div className="flex flex-wrap justify-between gap-3 pb-2">
          <FeedType setFeedType={setFeedType} feedType={feedType} />
          <Settings />
        </div>
        <List feedType={feedType} />
      </div>
    </div>
  );
};

export default Notification;
