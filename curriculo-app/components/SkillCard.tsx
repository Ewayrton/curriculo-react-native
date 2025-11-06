// components/SkillCard.tsx (Atualizado com Nível Especialista)

import React from "react";
import { Pressable, Alert } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Badge, BadgeText } from "@/components/ui/badge";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pencil, Trash2 } from "lucide-react-native";
import { useColorScheme } from "nativewind";

// 1. Tipo de dados (baseado no model habilidade.js)
export type SkillItem = {
  id: string;
  nome: string;
  nivel: string; // Ex: Básico, Intermediário, Avançado, Especialista
};

// --- FUNÇÃO ATUALIZADA ---
// 2. Helper para estilizar o Badge (agora com 'Especialista')
const getBadgeStyle = (nivel: string) => {
  const lowerNivel = nivel.toLowerCase();

  // Ordem de verificação (do mais alto para o mais baixo)
  if (lowerNivel.includes("especialista")) {
    return { action: "warning", text: "text-yellow-800 dark:text-yellow-200" };
  }
  if (lowerNivel.includes("avançado")) {
    return { action: "success", text: "text-green-800 dark:text-green-200" };
  }
  if (lowerNivel.includes("intermediário")) {
    return { action: "info", text: "text-blue-800 dark:text-blue-200" };
  }
  // Padrão para Básico ou qualquer outro
  return { action: "muted", text: "text-slate-800 dark:text-slate-200" };
};
// --- FIM DA ATUALIZAÇÃO ---

// 3. Props do componente
type SkillCardProps = {
  item: SkillItem;
  isDeleting: boolean; 
  onEdit: (item: SkillItem) => void; 
  onDelete: (id: string) => void; 
};

export function SkillCard({ item, isDeleting, onEdit, onDelete }: SkillCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const badgeStyle = getBadgeStyle(item.nivel); // A mágica acontece aqui

  // Cores dos ícones
  const deleteIconColor = isDark ? "#f87171" : "#dc2626"; // Vermelho
  const editIconColor = isDark ? "#60a5fa" : "#2563eb"; // Azul

  // Função de confirmação
  const confirmDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir a habilidade "${item.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => onDelete(item.id) },
      ]
    );
  };

  return (
    <Card className="w-full mb-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      
      {/* 4. Conteúdo e Ações em linha */}
      <HStack className="justify-between items-center">
        
        {/* Nome da Habilidade */}
        <Heading className="text-lg font-semibold text-black dark:text-white">
          {item.nome}
        </Heading>

        {/* 5. Ações (Editar/Excluir) ou Badge (Nível) */}
        {isDeleting ? (
          // Ícone de Excluir
          <Pressable onPress={confirmDelete} className="p-1">
            <Icon as={Trash2} size="md" color={deleteIconColor} />
          </Pressable>
        ) : (
          <HStack className="items-center space-x-3">
            {/* Badge de Nível */}
            <Badge
              // @ts-ignore - Permite 'success', 'info', 'warning', 'muted'
              action={badgeStyle.action}
              variant="solid"
              className="rounded-md"
            >
              <BadgeText className={badgeStyle.text}>
                {item.nivel}
              </BadgeText>
            </Badge>
            {/* Ícone de Editar */}
            <Pressable onPress={() => onEdit(item)} className="p-1">
              <Icon as={Pencil} size="md" color={editIconColor} />
            </Pressable>
          </HStack>
        )}
      </HStack>
    </Card>
  );
}