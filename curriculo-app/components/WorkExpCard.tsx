import React from "react";
import { Pressable, Alert } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge, BadgeText } from "@/components/ui/badge";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pencil, Trash2 } from "lucide-react-native";
import { useColorScheme } from "nativewind";

// 1. Tipo para experiência profissional
export type WorkExpItem = {
  id: string;
  empresa: string;
  cargo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string | null;
};

// 2. Helper para formatar a data (lógica idêntica ao AcademicCard)
const formatWorkExpItem = (item: WorkExpItem) => {
  const anoInicio = item.dataInicio ? item.dataInicio.split("-")[0] : "";
  let anoFim = null;
  let status = "Atual"; // Mudamos de "Cursando" para "Atual"
  let periodo = `${anoInicio} - Presente`;

  if (item.dataFim) {
    anoFim = item.dataFim.split("-")[0];
    const dateParts = item.dataFim.split('-').map(Number);
    const dataFimDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (dataFimDate <= today) {
      status = "Encerrado"; // Mudamos de "Concluído" para "Encerrado"
      periodo = `${anoInicio} - ${anoFim}`;
    }
  }
  return { periodo, status };
};

// 3. Props do componente
type WorkExpCardProps = {
  item: WorkExpItem;
  isDeleting: boolean; 
  onEdit: (item: WorkExpItem) => void; 
  onDelete: (id: string) => void; 
};

export function WorkExpCard({ item, isDeleting, onEdit, onDelete }: WorkExpCardProps) {
  const { periodo, status } = formatWorkExpItem(item);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Cores dos ícones
  const deleteIconColor = isDark ? "#f87171" : "#dc2626"; // Vermelho
  const editIconColor = isDark ? "#60a5fa" : "#2563eb"; // Azul

  // Função de confirmação
  const confirmDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir a experiência "${item.cargo} na ${item.empresa}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => onDelete(item.id) },
      ]
    );
  };

  return (
    <Card className="w-full mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      
      {/* Caixa de Ações (Editar/Excluir) */}
      <HStack className="absolute top-3 right-3 z-10 space-x-3">
        {isDeleting ? (
          <Pressable onPress={confirmDelete} className="p-1">
            <Icon as={Trash2} size="md" color={deleteIconColor} />
          </Pressable>
        ) : (
          <Pressable onPress={() => onEdit(item)} className="p-1">
            <Icon as={Pencil} size="md" color={editIconColor} />
          </Pressable>
        )}
      </HStack>
      
      {/* 4. Conteúdo do Card (atualizado) */}
      <Heading className="text-lg font-semibold text-black dark:text-white mb-1 w-[85%]">
        {item.cargo}
      </Heading>
      <Text className="text-base font-medium text-blue-600 dark:text-blue-400 mb-2 w-[85%]">
        {item.empresa}
      </Text>
      <Text className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {item.descricao}
      </Text>

      <HStack className="justify-between items-center mt-2">
        <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {periodo}
        </Text>
        <Badge
          action={status === "Encerrado" ? "muted" : "info"} // Muted (cinza) para encerrado
          variant="solid"
          className="rounded-md"
        >
          <BadgeText
            className={
              status === "Encerrado"
                ? "text-slate-800 dark:text-slate-200"
                : "text-blue-800 dark:text-blue-200"
            }
          >
            {status}
          </BadgeText>
        </Badge>
      </HStack>
    </Card>
  );
}