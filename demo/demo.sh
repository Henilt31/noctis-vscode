#!/usr/bin/env bash
# Noctis Theme - Shell / Bash Demo
# Demonstrates variables, conditionals, loops, functions, and string interpolations.

set -euo pipefail

THEME_NAME="Noctis"
BUILD_DIR="./dist"
LOG_PREFIX="[${THEME_NAME}]"

log_info() {
  local message="$1"
  printf "\033[38;2;139;124;255m%s\033[0m %s\n" "${LOG_PREFIX}" "${message}"
}

log_error() {
  local error_msg="$1"
  printf "\033[38;2;255;107;122m[ERROR]\033[0m %s\n" "${error_msg}" >&2
}

build_release_package() {
  local target_variant="${1:-all}"
  log_info "Starting verification for variant: ${target_variant}"

  if [[ ! -d "${BUILD_DIR}" ]]; then
    mkdir -p "${BUILD_DIR}"
  fi

  for file in themes/*.json; do
    if [[ -f "${file}" ]]; then
      log_info "Validating syntax schema: ${file}"
    else
      log_error "Missing theme artifact in ${file}"
      exit 1
    fi
  done

  log_info "All Noctis themes compiled and verified successfully."
}

# Entrypoint execution
build_release_package "all"
