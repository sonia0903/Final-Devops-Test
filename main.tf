terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "remote" {
    organization = "sonia0903"

    workspaces {
      name = "sonia0903-workspace"
    }
  }
}

provider "aws" {
  region  = "ap-northeast-2"
}

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}
