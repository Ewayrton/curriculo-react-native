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

// Tipo de dados
export type AcademicItem = {
  id: string;
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataFim: string | null;
};

// Helper para formatar a data
const formatAcademicItem = (item: AcademicItem) => {
  const anoInicio = item.dataInicio ? item.dataInicio.split("-")[0] : "";
  
  let anoFim = null;
  let status = "Cursando"; // Padrão: Cursando
  let periodo = `${anoInicio} - Presente`; // Padrão: Presente

  // Verifica se dataFim existe E não é uma string vazia
  if (item.dataFim) {
    anoFim = item.dataFim.split("-")[0];

    // Converte dataFim para objeto Date para comparação
    const dateParts = item.dataFim.split('-').map(Number); // [YYYY, MM, DD]
    const dataFimDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    const today = new Date();
    // Zera a hora de 'today' para comparar apenas as datas
    today.setHours(0, 0, 0, 0); 

    // Se a data de fim for hoje ou no PASSADO, está "Concluído"
    if (dataFimDate <= today) {
      status = "Concluído";
      periodo = `${anoInicio} - ${anoFim}`;
    }
    // Se for no FUTURO, o status "Cursando" e o período "Presente" (padrão) são mantidos.
  }

  return { periodo, status };
};

// Props atualizadas
type AcademicCardProps = {
  item: AcademicItem;
  isDeleting: boolean; 
  onEdit: (item: AcademicItem) => void; 
  onDelete: (id: string) => void; 
};

export function AcademicCard({ item, isDeleting, onEdit, onDelete }: AcademicCardProps) {
  // A lógica de exibição agora usa a função corrigida
  const { periodo, status } = formatAcademicItem(item);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Cores dos ícones
  const deleteIconColor = isDark ? "#f87171" : "#dc2626"; // Vermelho
  const editIconColor = isDark ? "#60a5fa" : "#2563eb"; // Azul

  // Função de confirmação de exclusão
  const confirmDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir a formação "${item.curso}"?`,
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
          // Ícone de Excluir
          <Pressable onPress={confirmDelete} className="p-1">
            <Icon as={Trash2} size="md" color={deleteIconColor} />
          </Pressable>
        ) : (
          // Ícone de Editar
          <Pressable onPress={() => onEdit(item)} className="p-1">
            <Icon as={Pencil} size="md" color={editIconColor} />
          </Pressable>
        )}
      </HStack>
      
      {/* Conteúdo do Card */}
      <Heading className="text-lg font-semibold text-black dark:text-white mb-1 w-[85%]">
        {item.curso}
      </Heading>
      <Text className="text-base font-medium text-blue-600 dark:text-blue-400 mb-4 w-[85%]">
        {item.instituicao}
      </Text>

      <HStack className="justify-between items-center mt-2">
        <Text className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {periodo} {/* Exibe o período formatado */}
        </Text>
        <Badge
          action={status === "Concluído" ? "success" : "info"}
          variant="solid"
          className="rounded-md"
        >
          <BadgeText
            className={
              status === "Concluído"
                ? "text-green-800 dark:text-green-200"
                : "text-blue-800 dark:text-blue-200"
            }
          >
            {status} {/* <--- Exibirá 'Cursando' se for futuro */}
          </BadgeText>
        </Badge>
      </HStack>
    </Card>
  );
}