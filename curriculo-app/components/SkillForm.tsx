import React, { useState, useEffect } from "react";
import { Alert, View, Platform, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useColorScheme } from "nativewind";
import type { SkillItem } from "@/components/SkillCard";

// 2. Importar Moti e ícones
import { MotiView, AnimatePresence } from "moti"; 
import { PlusCircle, Edit3, ChevronDown, MinusCircle } from "lucide-react-native";

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
  onCancel,
}: SkillFormProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#94a3b8" : "#475569";

  const isEditMode = !!initialData;
  const [formState, setFormState] = useState(initialFormState);

  // 3. Estado para controlar a visibilidade do formulário
  const [isOpen, setIsOpen] = useState(isEditMode); 

  // Efeito para preencher o formulário E ABRIR
  useEffect(() => {
    if (initialData) {
      setFormState({
        nome: initialData.nome,
        nivel: initialData.nivel,
      });
      setIsOpen(true); // Abre o formulário ao entrar no modo de edição
    } else {
      setFormState(initialFormState);
      setIsOpen(false); // Fecha ao sair do modo de edição (via 'onCancel')
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
      setIsOpen(false); // 4. Fecha o formulário após criar com sucesso
    }
  };

  // 5. Função de Cancelar atualizada
  const internalOnCancel = () => {
    if (onCancel) { // Se a prop 'onCancel' existir (modo de edição)
      onCancel();
    } else { // Se não (modo de adição), apenas fecha o acordeão
      setIsOpen(false);
    }
  };

  return (
    <Card className="w-full mb-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      
      {/* 6. CABEÇALHO CLICÁVEL (O Gatilho) */}
      <Pressable 
        onPress={() => {
          // Só permite abrir/fechar se NÃO estiver no modo de edição
          if (!isEditMode) {
            setIsOpen((prev) => !prev);
          }
        }}
        className="p-4" // Adiciona padding ao gatilho
      >
        <HStack className="items-center justify-between">
          <HStack className="items-center">
            <Icon
              as={isEditMode ? Edit3 : (isOpen ? MinusCircle : PlusCircle)} // 7. Ícone dinâmico
              size="md"
              color={iconColor}
              className="mr-2.5"
            />
            <Heading className="text-lg font-semibold text-black dark:text-white">
              {isEditMode ? "Editar Habilidade" : "Adicionar Habilidade"}
            </Heading>
          </HStack>
        </HStack>
      </Pressable>

      {/* 8. CONTEÚDO ANIMADO */}
      <AnimatePresence>
        {isOpen && ( // Só renderiza o MotiView se isOpen for true
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 160 }} // Altura aproximada do formulário
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "timing", duration: 300 }}
            style={{ overflow: 'hidden' }} // Impede que o conteúdo vaze durante a animação
          >
            <VStack space="md" className="p-4 pt-0">
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
                {/* 9. O botão de Cancelar agora chama a nova função */}
                {(isEditMode) && ( // Só mostra "Cancelar" no modo edição
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={internalOnCancel}
                    className="flex-1"
                  >
                    <ButtonText>Cancelar</ButtonText>
                  </Button>
                )}
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
          </MotiView>
        )}
      </AnimatePresence>
    </Card>
  );
}