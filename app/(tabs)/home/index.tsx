import React from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { usePetManager } from "@/hooks/usePetManager";
import { usePetStore } from "@/store/pet";
import useEventManager from "@/hooks/useEventManager";
import { ActivityIndicator } from "react-native-paper";
import { Image } from "react-native-expo-image-cache";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import MainLayout from "@/layout/main";
import FloatActions from "@/components/floatActions";
import Column from "@/components/column";
import Row from "@/components/row";
import { router, useFocusEffect } from "expo-router";
import { formatDate } from "@/utils";

// 屏幕宽度
const SCREEN_WIDTH = Dimensions.get("window").width;
// 屏幕高度
const SCREEN_HEIGHT = Dimensions.get("window").height;
// 一行列数
const NUM_COLUMNS = 2;
// 卡片间距
const CARD_MARGIN = 4;
// 卡片宽度
const CARD_WIDTH =
  (SCREEN_WIDTH - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
// 预设列表的大致尺寸
const ESTIMATED_LIST_SIZE = { width: SCREEN_WIDTH, height: SCREEN_HEIGHT };

const HomeScreen = () => {
  const { getCurrPet, currPet } = usePetManager();
  const setCurrPet = usePetStore((state) => state.setCurrPet);
  const { getPetMomentsByUser, petMoments, isLoading } = useEventManager();
  const isMountedRef = React.useRef(false);

  const handleCardPress = (id: string) => {
    router.push({ pathname: `/(moment)/details`, params: { id } });
  };

  useFocusEffect(
    React.useCallback(() => {
      getCurrPet()
        .then((data) => {
          setCurrPet(data);
          getPetMomentsByUser(data.id);
        })
        .finally(() => {
          isMountedRef.current = true;
        });
    }, [])
  );

  // 计算瀑布流布局
  const columnData = React.useMemo(() => {
    const columns: PetMoment[][] = Array(NUM_COLUMNS)
      .fill(null)
      .map(() => []);
    const columnHeights = Array(NUM_COLUMNS).fill(0);

    if (petMoments.length) {
      for (let i = 0; i < petMoments.length; i++) {
        const item = petMoments[i];
        const photo = item.pet_event_photos[0];
        const aspectRatio =
          photo?.width && photo?.height ? photo.height / photo.width : 1.5; // 默认宽高比
        const itemHeight = CARD_WIDTH * aspectRatio;

        const shortestColumn = columnHeights.indexOf(
          Math.min(...columnHeights)
        );
        columns[shortestColumn].push(item);
        columnHeights[shortestColumn] += itemHeight;
      }
    }

    return columns;
  }, [petMoments]);

  const renderItem = ({ item }: { item: PetMoment }) => {
    const photo = item.pet_event_photos[0];
    const aspectRatio =
      photo?.width && photo?.height ? photo.height / photo.width : 1.5;
    const itemHeight = CARD_WIDTH * aspectRatio;

    return (
      <Pressable
        style={[styles.card, { height: itemHeight }]}
        onPress={() => handleCardPress(item.id)}
      >
        <Image
          uri={photo.photo_url}
          style={styles.image}
          preview={{ uri: `${photo?.photo_url}?thumbnail=200` }}
          transitionDuration={300}
        />
        <Text style={styles.title}>{formatDate(item.created_at)}</Text>
      </Pressable>
    );
  };

  if (isLoading && !isMountedRef.current) {
    return (
      <MainLayout isLoading>
        <Row flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Row>
      </MainLayout>
    );
  }

  return (
    <React.Fragment>
      <FlashList
        data={columnData}
        renderItem={({ item }) => (
          <FlashList
            data={item}
            renderItem={renderItem}
            estimatedItemSize={CARD_WIDTH * 1.5}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
        numColumns={NUM_COLUMNS}
        estimatedListSize={ESTIMATED_LIST_SIZE}
        ListEmptyComponent={
          <Column alignItems="center" gap={8}>
            <Text style={styles.emptyText}>No moments yet</Text>
          </Column>
        }
      />
      <FloatActions />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: 240,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    paddingHorizontal: CARD_MARGIN,
  },
  card: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  title: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});

export default HomeScreen;
