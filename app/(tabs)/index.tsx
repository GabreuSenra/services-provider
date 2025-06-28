import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView } from 'react-native';

import services from '@/components/ServicesData';
import ThemedIconButton from '@/components/ThemedIconButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { homeStyles } from '@/constants/globalStyle';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';

const allCategories = services.flat();

const iconMap: { [key: string]: any } = {
  automoveis: require('@/assets/icons/carIcon.png'),
  beleza: require('@/assets/icons/beautyIcon.png'),
  casa: require('@/assets/icons/houseIcon.png'),
  eletronicos: require('@/assets/icons/eletronicIcon.png'),
  eventos: require('@/assets/icons/eventIcon.png'),
  moda: require('@/assets/icons/fashionIcon.png'),
  pets: require('@/assets/icons/petIcon.png'),
  saude: require('@/assets/icons/healthIcon.png'),
};

const gridButtonData = allCategories.map((item, index) => ({
  id: (index + 1).toString(),
  title: item.categoria,
  icon: iconMap[item.id],
  key: item.id
}));

const NUM_COLUMNS_MOBILE = 4;
const NUM_COLUMNS_WEB = 8;
const ITEM_SPACING = 10;

export default function HomeScreen() {
  const screenWidth = Dimensions.get('window').width;

  const contentWidthMobile = screenWidth - (2 * ITEM_SPACING);
  const itemSizeMobile = (contentWidthMobile - (NUM_COLUMNS_MOBILE - 1) * ITEM_SPACING) / NUM_COLUMNS_MOBILE;

  const maxWebGridContainerWidth = 1200;
  const contentWidthWeb = maxWebGridContainerWidth - (2 * ITEM_SPACING);
  const itemSizeWeb = (contentWidthWeb - (NUM_COLUMNS_WEB - 1) * ITEM_SPACING) / NUM_COLUMNS_WEB;

  const finalItemSize = Platform.OS === 'web' ? itemSizeWeb : itemSizeMobile;

  const [locationText, setLocationText] = useState<string>('Carregando...');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationText('Localização não permitida');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        setLocationText(`${address.city ?? 'Cidade'}, ${address.region ?? ''}`);
      }
    })();
  }, []);

  return (
    <ThemedView style={homeStyles.container}>
      {/* Header com localização */}
      <ThemedView style={[{
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: useThemeColor({}, 'background'),
        alignItems: 'center',
        marginTop: 30,
      }, Platform.OS === 'web' && {
        marginTop: 0
      }]}>
        <ThemedText style={{ fontSize: 14, fontWeight: '600' }}>
          {locationText}
        </ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={homeStyles.scrollViewContent}>
        <ThemedView style={[
          homeStyles.gridContainer,
          Platform.OS === 'web' && {
            maxWidth: maxWebGridContainerWidth,
            alignSelf: 'center'
          }
        ]}>
          {gridButtonData.map((item, index) => (
            <ThemedView
              key={item.id}
              style={[
                homeStyles.gridItemWrapper,
                {
                  width: finalItemSize,
                  height: finalItemSize,
                  marginRight: (index + 1) % NUM_COLUMNS_MOBILE === 0 ? 0 : ITEM_SPACING,
                  marginBottom: 8,

                }, Platform.OS === 'web' && {
                  marginRight: (index + 1) % NUM_COLUMNS_WEB === 0 ? 0 : ITEM_SPACING,
                }

              ]}
            >
              <ThemedIconButton
                iconSource={item.icon} // Já está correto, pois item.icon é o require()
                iconSize={finalItemSize * 0.52}
                iconColor="#FFF" // Cor do ícone (branco)
                title={item.title}
                onPress={() => router.push({
                  pathname: "../category/[id]",
                  params: { id: item.key, categoryName: item.title }
                })}
              />
            </ThemedView>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
