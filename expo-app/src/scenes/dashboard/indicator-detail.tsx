import { View, Pressable } from 'react-native';
import { Portal, PortalHost } from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import MyText from '~/components/ui/my-text';
import { useSelectedIndicator } from '~/zustand/indicator/useSelectedIndicator';
import { Close } from '~/assets/icons/close';
import { LineChart } from '~/components/indicators/graphs/line';

export function IndicatorDetail() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedIndicator, setSelectedIndicator } = useSelectedIndicator(
    (state) => state,
  );

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const isOpenedRef = useRef(false);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index < 0) {
      isOpenedRef.current = false;
    }
  }, []);

  function closeBottomSheet() {
    console.log('closeBottomSheet');
    bottomSheetRef.current?.close();
    if (selectedIndicator?.slug) setSelectedIndicator(null);
    isOpenedRef.current = false;
  }
  function openBottomSheet() {
    bottomSheetRef.current?.expand();
    isOpenedRef.current = true;
  }

  console.log(selectedIndicator?.slug);

  useEffect(() => {
    if (!!selectedIndicator?.slug && !isOpenedRef.current) {
      isOpenedRef.current = true;
      openBottomSheet();
    }
  }, [selectedIndicator?.slug]);

  return (
    <View>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          onClose={() => {
            console.log('onClose');
            closeBottomSheet();
          }}
          handleStyle={{
            backgroundColor: '#3343BD',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
          handleIndicatorStyle={{
            backgroundColor: '#3343BD',
          }}
        >
          <View className="flex flex-1 bg-app-gray ">
            <View
              className=" -top-2 left-0 right-0 flex items-center justify-center bg-app-primary
"
            >
              <MyText font="MarianneBold" className=" text-2xl text-white">
                {selectedIndicator?.name}
              </MyText>
              <MyText
                font="MarianneRegular"
                className="pb-2 text-sm text-white"
              >
                Mise à jour le 12/12/2021
              </MyText>
            </View>
            <Pressable
              onPress={() => {
                console.log('onPress');
                closeBottomSheet();
              }}
              className="absolute right-2 top-0"
            >
              <Close />
            </Pressable>
            <View className="px-6 pt-12">
              <LineChart value={45} />
              <Title label="Nos recommandations" />

              <View className="mt-2 rounded-md bg-white p-2">
                <MyText className=" text-xs">
                  🚶‍♂️Lors de vos trajets à pied ou à vélo, préférez les chemins
                  secondaires et les itinéraires moins fréquentés, ce qui vous
                  permettra d'éviter les zones à fort trafic et de limiter votre
                  exposition à la pollution atmosphérique.
                </MyText>
              </View>
              <View className="mt-2 rounded-md bg-white p-2">
                <MyText className=" text-xs">
                  🏋️‍♂️ Limitez les activités physiques intenses en extérieur
                  pendant les périodes de vigilance météo pour réduire
                  l'exposition aux polluants atmosphériques et préserver votre
                  santé.
                </MyText>
              </View>
              <Title label="à propos de la qualité de l’air et l’indice ATMO" />
              <MyText className=" mt-2 ">
                L’indice ATMO est un indicateur journalier de la qualité de
                l’air calculé à partir des concentrations dans l’air de
                polluants réglementés tels que le dioxyde de soufre (SO2), le
                dioxyde d’azote (NO2), l’ozone (O3) et les particules fines...
                Il qualifie la qualité de l’air sur une échelle de « bon à
                extrêmement mauvais » pour informer les citoyens. En cas de
                données insuffisantes, il affichera « indisponible » ; en cas
                d’incident engendrant des émissions atmosphériques spécifiques,
                il affichera « événement ».
              </MyText>
              <MyText className=" mt-2 ">En savoir plus</MyText>
            </View>
          </View>
        </BottomSheet>
      </Portal>
      <PortalHost name="indicator-detail" />
    </View>
  );
}

interface TitleProps {
  label: string;
}
function Title(props: TitleProps) {
  return (
    <MyText font="MarianneBold" className=" mt-8 text-sm uppercase">
      {props.label}
    </MyText>
  );
}
