provider "azurerm" {}

locals {

  preview_app_service_plan        = "${var.product}-${var.component}-${var.env}"
  non_preview_app_service_plan    = "${var.product}-${var.env}"
  app_service_plan                = "${var.env == "preview" || var.env == "spreview" ? local.preview_app_service_plan : local.non_preview_app_service_plan}"

  preview_vault_name              = "${var.raw_product}-aat"
  non_preview_vault_name          = "${var.raw_product}-${var.env}"
  key_vault_name                  = "${var.env == "preview" || var.env == "spreview" ? local.preview_vault_name : local.non_preview_vault_name}"

  sscs_preview_vault_name              = "sscs-aat"
  sscs_non_preview_vault_name          = "sscs-${var.env}"
  sscs_key_vault_name                  = "${var.env == "preview" || var.env == "spreview" ? local.sscs_preview_vault_name : local.sscs_non_preview_vault_name}"
}

resource "azurerm_resource_group" "rg" {
  name     = "${var.product}-${var.component}-${var.env}"
  location = "${var.location}"
  tags     = "${merge(var.common_tags, map("lastUpdated", "${timestamp()}"))}"
}

data "azurerm_key_vault" "ia_key_vault" {
  name                = "${local.key_vault_name}"
  resource_group_name = "${local.key_vault_name}"
}

data "azurerm_key_vault_secret" "system_username" {
  name      = "test-law-firm-a-username"
  vault_uri = "${data.azurerm_key_vault.ia_key_vault.vault_uri}"
}

data "azurerm_key_vault_secret" "system_password" {
  name      = "test-law-firm-a-password"
  vault_uri = "${data.azurerm_key_vault.ia_key_vault.vault_uri}"
}

data "azurerm_key_vault_secret" "sscs_s2s_secret" {
  name      = "sscs-s2s-secret"
  vault_uri = "https://sscs-aat.vault.azure.net/"
}

data "azurerm_key_vault_secret" "idam-secret" {
  name      = "idam-secret"
  vault_uri = "${data.azurerm_key_vault.ia_key_vault.vault_uri}"
}

module "ia_aip_frontend" {
  source               = "git@github.com:hmcts/cnp-module-webapp?ref=master"
  product              = "${var.product}-${var.component}"
  location             = "${var.location}"
  env                  = "${var.env}"
  ilbIp                = "${var.ilbIp}"
  resource_group_name  = "${azurerm_resource_group.rg.name}"
  is_frontend          = "${var.env != "preview" ? 1: 0}"
  subscription         = "${var.subscription}"
  additional_host_name = "${var.env != "preview" ? var.additional_hostname : "null"}"
  https_only           = "${var.env != "preview" ? "true" : "true"}"
  capacity             = "${var.capacity}"
  instance_size        = "${var.instance_size}"
  common_tags          = "${merge(var.common_tags, map("lastUpdated", "${timestamp()}"))}"
  asp_name             = "${local.app_service_plan}"
  asp_rg               = "${local.app_service_plan}"

  app_settings = {
    WEBSITE_NODE_DEFAULT_VERSION = "8.11.1"
    NODE_ENV                     = "${var.infrastructure_env}"
    SECURE_SESSION               = "${var.secure_session}"
    CCD_URL                      = "${var.ccd_url}"
    S2S_SECRET                   = "${data.azurerm_key_vault_secret.sscs_s2s_secret.value}"
    S2S_URL                      = "${var.s2s_url}"
    IDAM_URL                     = "${var.idam_url}"
    IDAM_SYSTEMUPDATE_USER       = "${data.azurerm_key_vault_secret.system_username.value}"
    IDAM_SYSTEMUPDATE_PASSWORD   = "${data.azurerm_key_vault_secret.system_password.value}"
    IDAM_CLIENT_SECRET           = "${data.azurerm_key_vault_secret.idam-secret.value}"
    IDAM_REDIRECT_URL            = "${var.idam_redirect_url}"
  }
}
