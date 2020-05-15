import os
import kaggle


def main():
    folder = './data/'
    datasets = ['ahmetfurkandemr/mask-datasets-v1']

    kaggle.api.authenticate()

    for dset in datasets:
        kaggle.api.dataset_download_files(dset, path=folder, unzip=True)



if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    main()