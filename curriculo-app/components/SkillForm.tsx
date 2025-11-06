// components/SkillForm.tsx (Atualizado para o botão "Cancelar")

import React, { useState, useEffect } from "react";
import { Alert, View, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { PlusCircle, Edit3, ChevronDown } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import type { SkillItem } from "@/components/SkillCard";

// Tipo para os dados do formulário
export type SkillFormData = {
  nome: string;
  nivel: string;
};

// Estado inicial
const initialFormState: SkillFormData = {
  nome: "",
  nivel: "",
};

// Props
type SkillFormProps = {
  isLoading: boolean;
  onSubmit: (formData: SkillFormData) => Promise<boolean>;
  initialData?: SkillItem | null;
  onCancel?: () => void;
};

export function SkillForm({
  isLoading,
  onSubmit,
  initialData = null,
  onCancel, // Recebe a função onCancel
}: SkillFormProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#94a3b8" : "#475569";

  const isEditMode = !!initialData;
  const [formState, setFormState] = useState(initialFormState);

  // Preenche os campos em modo de edição
  useEffect(() => {
    if (initialData) {
      setFormState({
        nome: initialData.nome,
        nivel: initialData.nivel,
      });
    } else {
      setFormState(initialFormState);
    }
  }, [initialData]);

  const handleFormChange = (key: keyof SkillFormData, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const internalHandleSubmit = async () => {
    if (!formState.nome || !formState.nivel) {
      Alert.alert("Erro", "Preencha o Nome e o Nível da habilidade.");
      return;
    }

    const success = await onSubmit(formState);
    if (!isEditMode && success) {
      setFormState(initialFormState);
    }
  };

  return (
    <Card className="w-full mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <HStack className="items-center mb-4">
        <Icon
          as={isEditMode ? Edit3 : PlusCircle}
          size="md"
          color={iconColor}
          className="mr-2.5"
        />
        <Heading className="text-lg font-semibold text-black dark:text-white">
          {isEditMode ? "Editar Habilidade" : "Adicionar Habilidade"}
        </Heading>
      </HStack>

      <VStack space="md">
        {/* Campo Nome */}
        <Input>
          <InputField
            placeholder="Nome (ex: React Native)"
            value={formState.nome}
            onChangeText={(v) => handleFormChange("nome", v)}
            className="text-black dark:text-white"
          />
        </Input>

        {/* Campo Nível (Picker nativo) */}
        <HStack
          className="border rounded-md items-center w-full"
          style={{
            borderColor: isDark ? "#475569" : "#CBD5E1",
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            ...(Platform.OS === 'android' && { height: 50, paddingLeft: 6 }),
          }}
        >
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={formState.nivel}
              onValueChange={(v) => handleFormChange("nivel", v)}
              dropdownIconColor={iconColor}
              style={{
                color: (formState.nivel ? (isDark ? "#FFFFFF" : "#000000") : (isDark ? "#94a3b8" : "#94a3b8")),
                ...(Platform.OS === 'android' && { backgroundColor: 'transparent' }),
              }}
            >
              <Picker.Item label="Selecione o nível" value="" />
              <Picker.Item label="Básico" value="Básico" />
              <Picker.Item label="Intermediário" value="Intermediário" />
              <Picker.Item label="Avançado" value="Avançado" />
              <Picker.Item label="Especialista" value="Especialista" />
            </Picker>
          </View>
          
          {Platform.OS === 'android' && (
             <Icon as={ChevronDown} size="sm" color={iconColor} className="mr-3" />
          )}
          
        </HStack>

        <HStack space="md">
          {/* --- CORREÇÃO AQUI --- */}
          {/* Mostra o botão "Cancelar" se a prop onCancel foi passada */}
          {onCancel && (
            <Button
              variant="outline"
              action="secondary"
              onPress={onCancel}
              className="flex-1"
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
          )}
          {/* --- FIM DA CORREÇÃO --- */}

          <Button
            onPress={internalHandleSubmit}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <ButtonText>{isEditMode ? "Atualizar" : "Enviar"}</ButtonText>
            )}
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
}