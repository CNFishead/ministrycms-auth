import styles from './FeatureChoose.module.scss';
import { useAllFeatures } from '@/state/serverState/features';
import { getPrice } from '@/utils/getPrice';
import { Button, Empty, message, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Feature from './feature/Feature.component';
import { useInterfaceStore } from '@/state/interface';

type Props = {};

const FeaturesView = (props: Props) => {
  const { data: featuresData, isLoading } = useAllFeatures();

  const { features } = useInterfaceStore();

  const addDiscounts = () => {
    var discountFeatures: any[] = [];
    console.log('selectedFeatures', features);
    var currentFeatures = [...features.map((f) => f._id)];

    //Add on core feature discount
    if (
      currentFeatures.includes('6328aadfd0c3abb536eae7ad') &&
      currentFeatures.includes('632b65745ddb31bf9714ef69')
    ) {
      discountFeatures.push(
        featuresData?.allFeatures.find(
          (f: any) => f._id === '63457a948c492c0963977ab6'
        )
      );
    }

    return discountFeatures;
  };

  if (isLoading) return <Skeleton active />;

  return (
    <div className={styles.container}>
      <div className={styles.features}>
        {featuresData?.availableFeatures.map((feature: any) => {
          return (
            <Feature
              feature={feature}
              key={feature._id}
              isSelected={features.includes(feature)}
            />
          );
        })}
        {addDiscounts().map((feature) => {
          return <Feature feature={feature} key={feature._id} isDiscount />;
        })}
      </div>
      <div className={styles.price}>
        <h1 className={styles.total}>Total:</h1>
        <h1 className={styles.totalPrice}>
          $
          {getPrice(features.concat(addDiscounts()), {
            noCredits: true,
          })}
          /Month
        </h1>
      </div>
    </div>
  );
};

export default FeaturesView;
