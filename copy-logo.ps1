# Script to copy the logo to Android mipmap directories
$sourceLogo = "C:\Users\thesh\Desktop\Not-Student-Portal\public\diuLogo.png"

# Define the target directories
$targetDirs = @(
    "C:\Users\thesh\Desktop\Not-Student-Portal\android\app\src\main\res\mipmap-hdpi",
    "C:\Users\thesh\Desktop\Not-Student-Portal\android\app\src\main\res\mipmap-mdpi",
    "C:\Users\thesh\Desktop\Not-Student-Portal\android\app\src\main\res\mipmap-xhdpi",
    "C:\Users\thesh\Desktop\Not-Student-Portal\android\app\src\main\res\mipmap-xxhdpi",
    "C:\Users\thesh\Desktop\Not-Student-Portal\android\app\src\main\res\mipmap-xxxhdpi"
)

# Copy the logo to each directory with the appropriate names
foreach ($dir in $targetDirs) {
    Copy-Item -Path $sourceLogo -Destination "$dir\ic_launcher.png" -Force
    Copy-Item -Path $sourceLogo -Destination "$dir\ic_launcher_round.png" -Force
    Copy-Item -Path $sourceLogo -Destination "$dir\ic_launcher_foreground.png" -Force
    Write-Host "Copied logo to $dir"
}

Write-Host "Logo copying complete. App icon has been updated."
