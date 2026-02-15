"""Setup script to install dependencies for the calculator with voice commands."""

import subprocess
import sys

def install_package(package_name, import_name=None):
    """Install a Python package."""
    if import_name is None:
        import_name = package_name
    
    try:
        __import__(import_name)
        print(f"✓ {package_name} is already installed")
        return True
    except ImportError:
        print(f"Installing {package_name}...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package_name])
            print(f"✓ {package_name} installed successfully")
            return True
        except subprocess.CalledProcessError:
            print(f"✗ Failed to install {package_name}")
            return False

def main():
    print("Setting up calculator with voice commands...\n")
    
    packages = [
        ("SpeechRecognition", "speech_recognition"),
        ("pillow", "PIL"),
    ]
    
    all_installed = True
    for package, import_name in packages:
        if not install_package(package, import_name):
            all_installed = False
    
    print("\n" + "="*50)
    if all_installed:
        print("✓ All dependencies installed successfully!")
        print("\nYou can now run the calculator with:")
        print('  python "c:\\Users\\OJAS RANA\\OneDrive\\Documents\\calculator_tk.py"')
    else:
        print("⚠ Some dependencies failed to install.")
        print("Please install them manually:")
        print("  pip install SpeechRecognition pillow")
    print("="*50)

if __name__ == "__main__":
    main()
