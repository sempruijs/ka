{
  description = "Built system for website";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/release-22.05";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = { self, flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit self; } {
      imports = [];
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      perSystem = { config, self', inputs', pkgs, system, ... }: {
        packages = {
          default = pkgs.stdenv.mkDerivation {
            buildInputs = with pkgs; [ nodePackages.typescript ];
            src = ./site;
            name = "kenmerkende-aspecten";
            buildPhase = ''
              cd ts
              tsc --build               
              cd ..
            '';

            installPhase = ''
              mkdir $out
              cp ./index.html $out
              cp ./content/kenmerkendeAspecten.json $out
              cp ./ts/index.js $out
            '';
          };
        };      
      };
      flake = {
       
      };
    };
}
