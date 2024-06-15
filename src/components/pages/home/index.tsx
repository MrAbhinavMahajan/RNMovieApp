import React from 'react';
import {ScrollView, View} from 'react-native';
import {STYLES} from '../../../constants/Styles';
import AppHeader from '../../common/AppHeader';
import {styles} from './styles';
import RNImage from '../../common/RNImage';
import AppCTA from '../../common/AppCTA';
import {ShadowedView} from 'react-native-fast-shadow';

const HomeScreen = () => {
  const imageURL =
    'https://media.licdn.com/dms/image/D5603AQEwgqk61oy06Q/profile-displayphoto-shrink_400_400/0/1713561898723?e=1723680000&v=beta&t=bvo0MwBiuhn4XpTHH0vWO5xr_VK6osWdSXn_KFtWseM';

  const openHamburger = () => {};

  const headerLeftCTA = () => {
    return (
      <ShadowedView style={styles.headerLeftCTAShadow}>
        <View style={styles.headerLeftCTA}>
          <AppCTA onPress={openHamburger}>
            <RNImage
              imageURL={imageURL}
              imageViewStyles={styles.headerLeftCTAImage}
            />
          </AppCTA>
        </View>
      </ShadowedView>
    );
  };

  const renderPageHeader = () => {
    return <AppHeader LeftComponent={headerLeftCTA()} title="Show Time" />;
  };

  const renderPageContent = () => {
    return <View style={styles.pageContentView}></View>;
  };

  const renderPageFooter = () => {
    return <></>;
  };

  return (
    <View style={styles.screenView}>
      <ScrollView bounces={false} contentContainerStyle={STYLES.flexGrow}>
        {renderPageHeader()}
        {renderPageContent()}
        {renderPageFooter()}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
