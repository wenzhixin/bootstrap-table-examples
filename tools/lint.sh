#!/bin/bash

FOLDERS=("column-options" "extensions" "issues" "methods" "options" "welcomes")

# 检查传入参数
if [[ $# -eq 0 ]]; then
  echo "Usage: $0 [--pre | --post]"
  exit 1
fi

# 遍历文件夹并处理文件扩展名
process_files() {
  local extension_from=$1
  local extension_to=$2

  for folder in "${FOLDERS[@]}"; do
    if [[ -d $folder ]]; then
      for file in "$folder"/*.$extension_from; do
        if [[ -f $file ]]; then
          mv "$file" "${file%.$extension_from}.$extension_to"
        fi
      done
    else
      echo "Warning: $folder does not exist."
    fi
  done
}

# 根据参数执行对应操作
case $1 in
  --pre)
    mv welcome.html welcome.vue
    process_files "html" "vue"
    ;;
  --post)
    mv welcome.vue welcome.html
    process_files "vue" "html"
    ;;
  *)
    echo "Invalid option: $1. Use --pre or --post."
    exit 1
    ;;
esac
