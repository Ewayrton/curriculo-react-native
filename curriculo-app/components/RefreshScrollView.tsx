import React, { useState, useCallback } from "react";
import type { ScrollViewProps } from "react-native";
import { ScrollView } from "@/components/ui/scroll-view";
import { RefreshControl } from "@/components/ui/refresh-control";

type RefreshScrollViewProps = {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  scrollViewProps?: ScrollViewProps;
  tintColor?: string;
};

export function RefreshScrollView({
  children,
  onRefresh,
  scrollViewProps,
  tintColor = "#72b5f7ff", // Cor padrão
}: RefreshScrollViewProps) {
  
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error("Falha ao atualizar:", error);
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return (
    <ScrollView
      {...scrollViewProps}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={tintColor}
          colors={[tintColor]}
        />
      }
    >
      {children}
    </ScrollView>
  );
}