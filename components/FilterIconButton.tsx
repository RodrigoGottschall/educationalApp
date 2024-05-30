import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  NativeSyntheticEvent,
  ImageErrorEventData,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

interface FilterIconButtonProps {
  onFilterChange: (filter: string) => void;
}

const FilterIconButton: React.FC<FilterIconButtonProps> = ({
  onFilterChange,
}) => {
  const [filter, setFilter] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const handleFilterSelect = (filter: string) => {
    setFilter(filter);
    onFilterChange(filter);
    hideMenu();
  };

  const handleIconError = (
    error: NativeSyntheticEvent<ImageErrorEventData>
  ) => {
    console.error("Erro ao carregar o ícone:", error);
    Alert.alert("Erro", "Não foi possível carregar o ícone de filtro.");
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu} style={styles.iconButton}>
            <Icon
              name="filter"
              size={30}
              color="#788796"
              onError={handleIconError}
            />
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={() => handleFilterSelect("male")}>
          Masculino
        </MenuItem>
        <MenuItem onPress={() => handleFilterSelect("female")}>
          Feminino
        </MenuItem>
        <MenuDivider />
        <MenuItem onPress={() => handleFilterSelect("")}>
          Limpar Filtro
        </MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
  },
});

export default FilterIconButton;
