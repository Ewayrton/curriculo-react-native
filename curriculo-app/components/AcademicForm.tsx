import React, { useState, useEffect } from "react";
import { Alert, Pressable } from "react-native"; // 1. Importar Pressable
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useColorScheme } from "nativewind";
import type { AcademicItem } from "@/components/AcademicCard"; 

// 2. Importar o DatePicker e novos ícones
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { MotiView, AnimatePresence } from "moti"; 
import { PlusCircle, Edit3, MinusCircle, CalendarDays } from "lucide-react-native";
import { Text } from "@/components/ui/text";

// Tipo para os dados do formulário
export type AcademicFormData = {
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataFim: string; 
};

// Estado inicial
const initialFormState = {
  instituicao: "",
  curso: "",
  dataInicio: "",
  dataFim: "",
};

// Helper para formatar a data (Date -> YYYY-MM-DD)
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Props
type AcademicFormProps = {
  isLoading: boolean;
  onSubmit: (formData: AcademicFormData) => Promise<boolean>;
  initialData?: AcademicItem | null;
  onCancel?: () => void;
};

export function AcademicForm({
  isLoading,
  onSubmit,
  initialData = null,
  onCancel,
}: AcademicFormProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#94a3b8" : "#475569";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const placeholderColor = isDark ? "#94a3b8" : "#94a3b8";

  const isEditMode = !!initialData;
  const [formState, setFormState] = useState(initialFormState);
  const [isOpen, setIsOpen] = useState(isEditMode); 

  // --- 3. Novos Estados para o DatePicker ---
  const [showPicker, setShowPicker] = useState(false);
  const [dateToEdit, setDateToEdit] = useState(new Date());
  const [currentField, setCurrentField] = useState<'dataInicio' | 'dataFim' | null>(null);

  // Efeito para preencher o formulário E ABRIR
  useEffect(() => {
    if (initialData) {
      setFormState({
        instituicao: initialData.instituicao,
        curso: initialData.curso,
        dataInicio: initialData.dataInicio,
        dataFim: initialData.dataFim || "", 
      });
      setIsOpen(true);
    } else {
      setFormState(initialFormState);
      setIsOpen(false);
    }
  }, [initialData]);

  const handleFormChange = (key: keyof AcademicFormData, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const internalHandleSubmit = async () => {
    if (!formState.instituicao || !formState.curso || !formState.dataInicio) {
      Alert.alert("Erro", "Preencha Instituição, Curso e Data Início.");
      return;
    }

    const success = await onSubmit(formState);
    if (!isEditMode && success) {
      setFormState(initialFormState);
      setIsOpen(false);
    }
  };

  const internalOnCancel = () => {
    if (onCancel) { 
      onCancel();
    } else { 
      setIsOpen(false);
    }
  };

  // --- 4. Funções para o DatePicker ---
  
  // Abre o seletor de data
  const showDatePicker = (field: 'dataInicio' | 'dataFim') => {
    const currentDateString = formState[field];
    // Corrige bug de fuso horário ao parsear YYYY-MM-DD
    const date = currentDateString ? new Date(currentDateString.replace(/-/g, '/')) : new Date();
    
    setDateToEdit(date);
    setCurrentField(field);
    setShowPicker(true);
  };

  // Chamado quando a data é selecionada
  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false); // Esconde o picker

    // Se uma data foi selecionada (e não foi cancelado)
    if (event.type === 'set' && selectedDate && currentField) {
      const formattedDate = formatDate(selectedDate);
      handleFormChange(currentField, formattedDate);
      setDateToEdit(selectedDate);
    }
  };
  
  // Componente reutilizável para o Input de Data
  const DateInput = ({ field, placeholder }: { field: 'dataInicio' | 'dataFim', placeholder: string }) => {
    const value = formState[field];
    return (
      <Pressable onPress={() => showDatePicker(field)}>
        <HStack
          className="border rounded-md items-center w-full"
          style={{
            borderColor: isDark ? "#475569" : "#CBD5E1",
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            height: 50,
            paddingHorizontal: 12,
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ color: value ? textColor : placeholderColor }}>
            {value || placeholder}
          </Text>
          <Icon as={CalendarDays} size="sm" color={iconColor} />
        </HStack>
      </Pressable>
    );
  };
  
  // --- Fim das Funções do DatePicker ---

  return (
    <Card className="w-full mb-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      
      {/* CABEÇALHO CLICÁVEL (O Gatilho) */}
      <Pressable 
        onPress={() => {
          if (!isEditMode) {
            setIsOpen((prev) => !prev);
          }
        }}
        className="p-4"
      >
        <HStack className="items-center justify-between">
          <HStack className="items-center">
            <Icon
              as={isEditMode ? Edit3 : (isOpen ? MinusCircle : PlusCircle)}
              size="md"
              color={iconColor}
              className="mr-2.5"
            />
            <Heading className="text-lg font-semibold text-black dark:text-white">
              {isEditMode ? "Editar Formação" : "Adicionar Formação"}
            </Heading>
          </HStack>
        </HStack>
      </Pressable>

      {/* CONTEÚDO ANIMADO */}
      <AnimatePresence>
        {isOpen && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 290 }} // Altura para 4 inputs + 1 botão
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "timing", duration: 300 }}
            style={{ overflow: 'hidden' }}
          >
            <VStack space="md" className="p-4 pt-0">
              <Input>
                <InputField
                  placeholder="Instituição (ex: UNICAP)"
                  value={formState.instituicao}
                  onChangeText={(v) => handleFormChange("instituicao", v)}
                  className="text-black dark:text-white"
                />
              </Input>
              <Input>
                <InputField
                  placeholder="Curso (ex: ADS)"
                  value={formState.curso}
                  onChangeText={(v) => handleFormChange("curso", v)}
                  className="text-black dark:text-white"
                />
              </Input>

              {/* --- 5. Inputs de Data Substituídos --- */}
              <DateInput field="dataInicio" placeholder="Data Início (YYYY-MM-DD)" />
              <DateInput field="dataFim" placeholder="Data Fim (YYYY-MM-DD, ou deixe em branco)" />
              {/* --- Fim da Substituição --- */}

              <HStack space="md">
                {(isEditMode) && ( 
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

      {/* --- 6. Renderiza o DatePicker (ele é um modal) --- */}
      {showPicker && (
        <DateTimePicker
          value={dateToEdit}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </Card>
  );
}