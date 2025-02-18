<template>
    <div class="pt-8 bg-gray-50 dark:bg-gray-900">

        <div id="main-content" class="w-full max-w-screen-2xl mx-auto">
            <main>
                <slot></slot>
            </main>

            <footer class="md:flex md:items-center md:justify-between px-4 2xl:px-0 py-6 md:py-10">
                <p class="text-sm text-center text-gray-500 mb-4 md:mb-0">
                    &copy; 2019 <a href="#" class="hover:underline" target="_blank">Website</a>. All rights reserved.
                </p>
                <ul class="flex flex-wrap items-center justify-center">
                    <li><a href="#" class="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Terms</a></li>
                    <li><a href="#" class="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Licensing</a></li>
                    <li><a href="#" class="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Cookie Policy</a></li>
                    <li><a href="#" class="text-sm font-normal text-gray-500 hover:underline dark:text-gray-400">Contact</a></li>
                </ul>
            </footer>
        </div>

    </div>
</template>


